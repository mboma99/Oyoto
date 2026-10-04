"use server";

import { calEventSlug, calUsername } from "@/lib/seo";

/* The contact page's scheduler talks to Cal.com through these two Server
   Functions: real availability in, real bookings out. Cal.com's public event
   endpoints need no key; if CAL_API_KEY is set (Netlify env), it's sent so
   bookings are made as the account owner. */

const CAL_API = "https://api.cal.com/v2";

function calHeaders(version: string): HeadersInit {
  const key = process.env.CAL_API_KEY;
  return {
    "Content-Type": "application/json",
    "cal-api-version": version,
    ...(key ? { Authorization: `Bearer ${key}` } : {}),
  };
}

const isTimeZone = (tz: string) => {
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Availability =
  | { ok: true; slots: Record<string, string[]> }
  | { ok: false; error: string };

/** Open start times (ISO strings) per day, in the visitor's time zone, for
    the days from `start` to `end` inclusive (YYYY-MM-DD). */
export async function getAvailability(
  start: string,
  end: string,
  timeZone: string
): Promise<Availability> {
  if (!ISO_DATE.test(start) || !ISO_DATE.test(end) || !isTimeZone(timeZone)) {
    return { ok: false, error: "Invalid range." };
  }

  const params = new URLSearchParams({
    eventTypeSlug: calEventSlug,
    username: calUsername,
    start,
    end,
    timeZone,
  });

  try {
    const res = await fetch(`${CAL_API}/slots?${params}`, {
      headers: calHeaders("2024-09-04"),
      cache: "no-store",
    });
    const body = await res.json();
    if (!res.ok || body.status === "error") throw new Error(body?.error?.message ?? res.statusText);

    const slots: Record<string, string[]> = {};
    for (const [day, list] of Object.entries(body.data ?? {})) {
      slots[day] = (list as { start: string }[]).map((s) => s.start);
    }
    return { ok: true, slots };
  } catch (err) {
    console.error("[contact] availability failed", err);
    return { ok: false, error: "We couldn't load available times." };
  }
}

export type BookingInput = {
  start: string;
  timeZone: string;
  name: string;
  email: string;
  topic: string;
  notes: string;
  guest: string;
};

export type BookingResult =
  | { ok: true; start: string; end: string; meetingUrl: string | null; uid: string }
  | { ok: false; error: string };

const clip = (s: unknown, max: number) => (typeof s === "string" ? s.trim().slice(0, max) : "");

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  // Anyone can POST here, so everything is re-checked on the server.
  const name = clip(input.name, 120);
  const email = clip(input.email, 254);
  const topic = clip(input.topic, 300);
  const notes = clip(input.notes, 2000);
  const guest = clip(input.guest, 254);
  const startMs = Date.parse(input.start);

  if (!name || !EMAIL.test(email) || !topic) {
    return { ok: false, error: "Please fill in your name, a valid email and what the call is about." };
  }
  if (guest && !EMAIL.test(guest)) {
    return { ok: false, error: "The guest email doesn't look right." };
  }
  if (!Number.isFinite(startMs) || startMs < Date.now()) {
    return { ok: false, error: "That time has passed. Please pick another." };
  }
  if (!isTimeZone(input.timeZone)) {
    return { ok: false, error: "Invalid time zone." };
  }

  try {
    const res = await fetch(`${CAL_API}/bookings`, {
      method: "POST",
      headers: calHeaders("2024-08-13"),
      cache: "no-store",
      body: JSON.stringify({
        start: new Date(startMs).toISOString(),
        eventTypeSlug: calEventSlug,
        username: calUsername,
        attendee: { name, email, timeZone: input.timeZone, language: "en" },
        ...(guest ? { guests: [guest] } : {}),
        // The event has no topic field of its own, so the topic leads the notes
        bookingFieldsResponses: {
          notes: notes ? `${topic}\n\n${notes}` : topic,
        },
        metadata: { source: "oyoto.co.uk/contact" },
      }),
    });
    const body = await res.json();

    if (!res.ok || body.status === "error") {
      console.error("[contact] booking failed", res.status, body?.error);
      const taken = /no.*available|already.*booked|not available/i.test(body?.error?.message ?? "");
      return {
        ok: false,
        error: taken
          ? "Sorry, that time has just been taken. Please pick another."
          : "We couldn't confirm the booking. Please try again or email us.",
      };
    }

    const data = Array.isArray(body.data) ? body.data[0] : body.data;
    const location: string | undefined = data?.meetingUrl ?? data?.location;
    return {
      ok: true,
      uid: data.uid,
      start: data.start,
      end: data.end,
      meetingUrl: location && /^https?:\/\//.test(location) ? location : null,
    };
  } catch (err) {
    console.error("[contact] booking failed", err);
    return { ok: false, error: "We couldn't confirm the booking. Please try again or email us." };
  }
}

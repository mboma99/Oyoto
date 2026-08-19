"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { defaultCalLink, contactEmail, contactMailto } from "@/lib/seo";

const GREETINGS = [
  { word: "hello", color: "#ffb184" },
  { word: "olá", color: "#86a68c" },
  { word: "bonjour", color: "#93c5fd" },
  { word: "salve", color: "#c4b5fd" },
  { word: "konnichiwa", color: "#fde047" },
  { word: "ciao", color: "#f4978e" },
];

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const FAQS = [
  {
    question: "What does the discovery call cover?",
    answer:
      "We'll talk through where you are, your product objectives, technical requirements, and timeline. No extensive preparation is required — just bring your current concept or questions.",
  },
  {
    question: "How quickly can Oyoto start?",
    answer:
      "We typically initiate new client discovery sprints and architecture reviews within 1–2 weeks, depending on current studio availability.",
  },
  {
    question: "Do you work on a fixed-price or retainer basis?",
    answer:
      "Both models are available. Specific milestone builds and scoped MVPs are typically structured as fixed-price engagements, while ongoing product advisory and engineering partnerships run on monthly retainers.",
  },
  {
    question: "What size companies do you work with?",
    answer:
      "We collaborate primarily with venture-backed startups (Seed to Series B), visionary founders, and established teams that need senior engineering firepower and design direction.",
  },
  {
    question: "What technology stack do you specialize in?",
    answer:
      "Our core stack is React, Next.js, TypeScript, FastAPI, Python, PostgreSQL, Flutter for cross-platform mobile, Three.js / Matter.js for interactive experiences, and GCP / AWS cloud infrastructure.",
  },
  {
    question: "Can we execute an NDA prior to discussing details?",
    answer:
      "Yes, absolutely. We routinely sign mutual non-disclosure agreements prior to reviewing confidential project specifications or proprietary data.",
  },
];

export default function Contact() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scheduler state
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("13:00");
  const [bookingStep, setBookingStep] = useState<
    "select_date" | "select_time" | "fill_form" | "confirmed"
  >("select_date");

  // Attendee info form state
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [meetingTopic, setMeetingTopic] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showGuests, setShowGuests] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");

  // Cycle greeting words smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // IntersectionObserver for scroll reveals
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealActive);
          } else {
            entry.target.classList.remove(styles.revealActive);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    root.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Calendar calculations
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayOfWeek = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Monday as first day: Sun (0) -> 6, Mon (1) -> 0, etc.
    return firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  }, [year, month]);

  const isCurrentMonthOrPast = useMemo(() => {
    const today = new Date();
    return (
      year < today.getFullYear() ||
      (year === today.getFullYear() && month <= today.getMonth())
    );
  }, [year, month]);

  const prevMonth = () => {
    if (isCurrentMonthOrPast) return;
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const isDateDisabled = (day: number) => {
    const d = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable past days
    if (d < today) return true;

    // Disable weekends (Sat = 6, Sun = 0)
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return true;

    return false;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const handleDateSelect = (day: number) => {
    if (isDateDisabled(day)) return;
    const picked = new Date(year, month, day);
    setSelectedDate(picked);
    setBookingStep("select_time");
  };

  const handleTimeSelect = (slot: string) => {
    setSelectedTime(slot);
    setBookingStep("fill_form");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep("confirmed");
  };

  // Selected date formatting
  const selectedDateWeekday = selectedDate
    ? WEEKDAY_NAMES[selectedDate.getDay()]
    : "";

  const selectedDateFormatted = selectedDate
    ? `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
    : "";

  // Google Calendar URL generator
  const googleCalendarUrl = useMemo(() => {
    if (!selectedDate || !selectedTime) return "#";

    const [hoursStr, minutesStr] = selectedTime.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const pad = (n: number) => String(n).padStart(2, "0");
    const formatGCal = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
        d.getUTCHours()
      )}${pad(d.getUTCMinutes())}00Z`;

    const dates = `${formatGCal(start)}/${formatGCal(end)}`;
    const title = encodeURIComponent("Oyoto · Discovery Session (Google Meet)");
    const details = encodeURIComponent(
      `Discovery consultation between ${attendeeName || "Client"} and Oyoto Studio.\n\nMeeting link: https://meet.google.com/oyo-tost-udo\nAgenda: ${
        meetingTopic || "Digital Product Architecture & Engineering"
      }\nGuest: ${guestEmail || "None"}\nNotes: ${additionalNotes || "N/A"}\nContact: ${contactEmail}`
    );
    const location = encodeURIComponent("Google Meet (https://meet.google.com/oyo-tost-udo)");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }, [selectedDate, selectedTime, attendeeName, meetingTopic, guestEmail, additionalNotes]);

  const currentGreeting = GREETINGS[greetingIndex];

  return (
    <div className={styles.page} ref={pageRef}>
      <SiteHeader tagline="Get in Touch" />

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.grid}>
            {/* Left Column: Heading, Intro & Direct Actions */}
            <div className={styles.leftCol}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} aria-hidden="true" />
                01 / Connect
              </p>

              <h1 className={styles.title}>
                Say{" "}
                <span className={styles.greetingWrap}>
                  <span
                    className={styles.greetingText}
                    style={{ color: currentGreeting.color }}
                  >
                    {currentGreeting.word}
                  </span>
                </span>
              </h1>

              <p className={styles.lead}>
                If you&apos;re building a digital product, launching a platform,
                or looking for senior technical architecture — let&apos;s talk
                through your vision.
              </p>

              <p className={styles.subtext}>
                Select an available date below to schedule a 30-minute discovery call, or reach out directly by email.
              </p>

              <a href={contactMailto} className={styles.emailBtn}>
                <span>Send Direct Email</span>
                <span className={styles.emailBtnIcon} aria-hidden="true">
                  ↗
                </span>
              </a>

              <div className={styles.studioMetaList}>
                <div className={styles.studioMetaItem}>
                  <span className={styles.studioMetaLabel}>Studio Location</span>
                  <span className={styles.studioMetaVal}>London, United Kingdom</span>
                </div>
                <div className={styles.studioMetaItem}>
                  <span className={styles.studioMetaLabel}>Platform</span>
                  <span className={styles.studioMetaVal}>Google Meet (Cal.com)</span>
                </div>
                <div className={styles.studioMetaItem}>
                  <span className={styles.studioMetaLabel}>Direct Contact</span>
                  <span className={styles.studioMetaVal}>{contactEmail}</span>
                </div>
                <div className={styles.studioMetaItem}>
                  <span className={styles.studioMetaLabel}>Response Window</span>
                  <span className={styles.studioMetaVal}>Under 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Right Column: Pure Sequential Scheduler */}
            <div className={styles.rightCol}>
              <div className={styles.schedulerCard}>
                {/* STEP 1: Date Only (Calendar Month View) */}
                {bookingStep === "select_date" && (
                  <div className={styles.calContainer}>
                    <div className={styles.calHeader}>
                      <h2 className={styles.calMonthTitle}>
                        {MONTH_NAMES[month]} {year}
                      </h2>
                      <div className={styles.calNavGroup}>
                        <button
                          type="button"
                          disabled={isCurrentMonthOrPast}
                          onClick={prevMonth}
                          aria-label="Previous month"
                          className={`${styles.calNavBtn} ${
                            isCurrentMonthOrPast ? styles.calNavBtnDisabled : ""
                          }`}
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          aria-label="Next month"
                          className={styles.calNavBtn}
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    <div className={styles.calWeekdays}>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>

                    <div className={styles.calDaysGrid}>
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className={styles.calDayCell} />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const disabled = isDateDisabled(day);
                        const today = isToday(day);

                        return (
                          <div key={`day-${day}`} className={styles.calDayCell}>
                            <button
                              type="button"
                              disabled={disabled}
                              onClick={() => handleDateSelect(day)}
                              className={`${styles.calDayBtn} ${
                                disabled ? styles.calDayBtnDisabled : ""
                              } ${today ? styles.calDayToday : ""}`}
                            >
                              {day}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Time Selection Screen (matching screenshot) */}
                {bookingStep === "select_time" && (
                  <div className={styles.timeSelectContainer}>
                    <button
                      type="button"
                      onClick={() => setBookingStep("select_date")}
                      className={styles.backSquareBtn}
                      aria-label="Back to calendar"
                    >
                      ←
                    </button>

                    <h2 className={styles.timeSelectDayTitle}>
                      {selectedDateWeekday}
                    </h2>
                    <p className={styles.timeSelectDateSubtitle}>
                      {selectedDateFormatted}
                    </p>

                    <div className={styles.timeSelectMetaRow}>
                      <span className={styles.timeSelectMetaItem}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        30m
                      </span>
                      <span className={styles.timeSelectMetaItem}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        Europe/London ▾
                      </span>
                    </div>

                    <div className={styles.timeSelectDivider} />

                    <div className={styles.timeSlotsStack}>
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleTimeSelect(slot)}
                          className={styles.timeSlotRowBtn}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: Attendee Info Form (matching screenshot) */}
                {bookingStep === "fill_form" && (
                  <form onSubmit={handleBookingSubmit} className={styles.calFormContainer}>
                    <div className={styles.calFormGroup}>
                      <label htmlFor="attendee-name" className={styles.calFormLabel}>
                        Your name *
                      </label>
                      <input
                        id="attendee-name"
                        type="text"
                        required
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        className={styles.calInput}
                      />
                    </div>

                    <div className={styles.calFormGroup}>
                      <label htmlFor="attendee-email" className={styles.calFormLabel}>
                        Email address *
                      </label>
                      <input
                        id="attendee-email"
                        type="email"
                        required
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        className={styles.calInput}
                      />
                    </div>

                    <div className={styles.calFormGroup}>
                      <label htmlFor="meeting-topic" className={styles.calFormLabel}>
                        What is this meeting about? *
                      </label>
                      <input
                        id="meeting-topic"
                        type="text"
                        required
                        placeholder="Please share the name and website of your project."
                        value={meetingTopic}
                        onChange={(e) => setMeetingTopic(e.target.value)}
                        className={styles.calInput}
                      />
                    </div>

                    <div className={styles.calFormGroup}>
                      <label htmlFor="additional-notes" className={styles.calFormLabel}>
                        Additional notes
                      </label>
                      <textarea
                        id="additional-notes"
                        rows={3}
                        placeholder="Please share anything that will help prepare for our meeting."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className={styles.calTextarea}
                      />
                    </div>

                    {!showGuests ? (
                      <button
                        type="button"
                        onClick={() => setShowGuests(true)}
                        className={styles.addGuestsBtn}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7.5" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                        Add guests
                      </button>
                    ) : (
                      <div className={styles.guestInputWrap}>
                        <input
                          type="email"
                          placeholder="Guest email address..."
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className={styles.calInput}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowGuests(false);
                            setGuestEmail("");
                          }}
                          className={styles.removeGuestBtn}
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    <p className={styles.calDisclaimer}>
                      By proceeding, you agree to Oyoto&apos;s <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
                    </p>

                    <div className={styles.calFormActions}>
                      <button
                        type="button"
                        onClick={() => setBookingStep("select_time")}
                        className={styles.calBackBtn}
                      >
                        Back
                      </button>
                      <button type="submit" className={styles.calConfirmBtn}>
                        Confirm
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 4: Booking Confirmed */}
                {bookingStep === "confirmed" && (
                  <div className={styles.successCard}>
                    <div className={styles.successHeader}>
                      <span className={styles.successIcon}>✓</span>
                      <div>
                        <h3 className={styles.successTitle}>Meeting Scheduled</h3>
                        <p className={styles.successDesc}>
                          Your Google Meet session is ready to add to your calendar.
                        </p>
                      </div>
                    </div>

                    <div className={styles.successSpecs}>
                      <div className={styles.successSpecRow}>
                        <span>📅 Date:</span>
                        <strong>{selectedDateFormatted}</strong>
                      </div>
                      <div className={styles.successSpecRow}>
                        <span>⏰ Time:</span>
                        <strong>{selectedTime} (30 mins)</strong>
                      </div>
                      <div className={styles.successSpecRow}>
                        <span>🎥 Video:</span>
                        <strong>Google Meet</strong>
                      </div>
                      <div className={styles.successSpecRow}>
                        <span>👤 Host:</span>
                        <strong>James Mboma (Oyoto Studio)</strong>
                      </div>
                    </div>

                    <div className={styles.calActionsGroup}>
                      <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.gcalBtn}
                      >
                        Add to Google Calendar ↗
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setBookingStep("select_date");
                          setSelectedDate(null);
                        }}
                        className={styles.secondaryActionBtn}
                      >
                        Book Another Time
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <span className={`${styles.sectionLabel} ${styles.reveal}`}>
            02 / Frequently Asked Questions
          </span>

          <div className={styles.faqList}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.question} className={`${styles.faqItem} ${styles.reveal}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={styles.faqButton}
                  >
                    <span className={styles.faqQuestion}>{faq.question}</span>
                    <span
                      className={`${styles.faqIcon} ${
                        isOpen ? styles.faqIconOpen : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`${styles.faqAnswer} ${
                      isOpen ? styles.faqAnswerOpen : ""
                    }`}
                  >
                    <p className={styles.faqAnswerText}>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

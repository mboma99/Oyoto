import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/*
 * Share card drawn like the book's cover: charcoal board, paper-white serif
 * title, apricot wordmark (apricot is text-safe on the spine colour only).
 * Colours mirror the tokens in globals.css.
 */
export async function renderOgCard({
  kicker,
  title,
  footer,
}: {
  kicker: string;
  title: string;
  footer: string;
}) {
  const serif = await readFile(join(process.cwd(), "src/app/fonts/DMSerifDisplay-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "#141414",
          color: "#f3f3f3",
          fontFamily: "DM Serif Display",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, color: "#ddad64" }}>{kicker}</div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 40 ? 76 : 96,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 30,
            color: "#97acc1",
            borderTop: "1px solid rgba(243, 243, 243, 0.24)",
            paddingTop: 28,
          }}
        >
          <span>{footer}</span>
          <span>oyoto.co.uk</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "DM Serif Display", data: serif, style: "normal", weight: 400 }],
    }
  );
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    if (!name || !email.includes("@") || message.length < 5)
      return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    await prisma.contactSubmission
      .create({
        data: {
          name,
          email,
          phone: String(body.phone || "") || null,
          company: String(body.company || "") || null,
          service: String(body.service || "") || null,
          message,
        },
      })
      .catch(() => null);
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey)
      return NextResponse.json(
        { error: "Email provider not configured" },
        { status: 503 },
      );
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ||
          "ZS Elite Partners <website@zsep.co.za>",
        to: [process.env.CONTACT_TO_EMAIL || "info@zsep.co.za"],
        reply_to: email,
        subject: `Website enquiry: ${name}${body.company ? ` — ${body.company}` : ""}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${body.phone || "-"}\nCompany: ${body.company || "-"}\nService: ${body.service || "-"}\n\n${message}`,
      }),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return NextResponse.json(
        {
          error: "Email delivery failed",
          status: response.status,
          details: text,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const details = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Unable to process request", details },
      { status: 500 },
    );
  }
}

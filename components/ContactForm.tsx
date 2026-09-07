"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { setState("sent"); form.reset(); } else setState("error");
  }
  return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name"/></label><label>Work email<input name="email" type="email" required placeholder="you@company.co.za"/></label></div><div className="form-row"><label>Phone<input name="phone" placeholder="+27 ..."/></label><label>Company<input name="company" placeholder="Company name"/></label></div><label>What can we help with?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Marketing & Brand Development</option><option>Promotions Agency</option><option>Software & Database Solutions</option><option>CCTV Installation</option><option>Multiple / Not sure yet</option></select></label><label>Tell us about the opportunity<textarea name="message" required rows={6} placeholder="What are you trying to improve, launch or solve?"/></label><button disabled={state === "sending"} className="button" type="submit">{state === "sending" ? "Sending…" : "Send enquiry"}<ArrowRight size={18}/></button>{state === "sent" && <p className="form-success"><CheckCircle2 size={18}/> Thanks. Your enquiry has been sent to info@zsep.co.za.</p>}{state === "error" && <p className="form-error">We couldn’t send that right now. Please email info@zsep.co.za directly.</p>}</form>
}

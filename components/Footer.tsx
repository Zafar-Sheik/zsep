import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return <footer className="footer"><div className="shell"><div className="footer-cta"><p className="eyebrow">One partner. More momentum.</p><h2>Ready to make the business <em>work better?</em></h2><Link href="/contact" className="button button-light">Book a free consultation <ArrowUpRight size={18}/></Link></div><div className="footer-grid"><div><Logo/><p className="muted">Integrated marketing, promotions, software and security solutions for ambitious businesses.</p></div><div><h4>Explore</h4><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/blog">Insights</Link></div><div><h4>Contact</h4><a href="mailto:info@zsep.co.za"><Mail size={15}/> info@zsep.co.za</a><a href="tel:+27837917158"><Phone size={15}/> +27 83 791 7158</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ZS Elite Partners.</span><Link href="/admin/login">Admin</Link></div></div></footer>;
}

"use client";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [["About", "/about"], ["Services", "/services"], ["Work", "/work"], ["Insights", "/blog"]];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner"><Logo/><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link className="button button-small" href="/contact">Start a conversation <ArrowUpRight size={16}/></Link></nav><button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></div>{open && <div className="mobile-nav">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></div>}</header>;
}

"use client";
import { useRouter } from "next/navigation";
export function AdminLogout(){const r=useRouter();return <button className="button button-ghost" onClick={async()=>{await fetch("/api/admin/logout",{method:"POST"});r.push("/admin/login")}}>Log out</button>}

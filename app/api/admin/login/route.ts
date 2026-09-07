import { NextResponse } from "next/server";
import { adminCookie, createSessionValue } from "@/lib/auth";
export async function POST(req:Request){const {password}=await req.json();if(!process.env.ADMIN_PASSWORD||password!==process.env.ADMIN_PASSWORD)return NextResponse.json({error:"Invalid password"},{status:401});const res=NextResponse.json({ok:true});res.cookies.set(adminCookie.name,createSessionValue(),{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:adminCookie.maxAge});return res}

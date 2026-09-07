import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
const slugify=(s:string)=>s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
export async function POST(req:Request){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});const b=await req.json();const post=await prisma.post.create({data:{title:b.title,slug:slugify(b.slug||b.title),excerpt:b.excerpt||"",content:b.content||"",coverImage:b.coverImage||null,coverAlt:b.coverAlt||null,seoTitle:b.seoTitle||null,seoDesc:b.seoDesc||null,category:b.category||"Insights",published:!!b.published,featured:!!b.featured,publishedAt:b.published?new Date():null}});return NextResponse.json(post)}

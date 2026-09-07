import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
export async function POST(req:Request){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});const data=await req.formData();const file=data.get("file");if(!(file instanceof File))return NextResponse.json({error:"No file"},{status:400});if(!file.type.startsWith("image/")||file.size>5_000_000)return NextResponse.json({error:"Image required, max 5MB"},{status:400});const ext=file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg";const name=`${Date.now()}-${crypto.randomUUID().slice(0,8)}.${ext}`;const dir=path.join(process.cwd(),"public","uploads");await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,name),Buffer.from(await file.arrayBuffer()));const url=`/uploads/${name}`;const asset=await prisma.mediaAsset.create({data:{url,alt:String(data.get("alt")||"")||null,label:file.name}}).catch(()=>null);return NextResponse.json({url,asset})}

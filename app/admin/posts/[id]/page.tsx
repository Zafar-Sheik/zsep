import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostEditor } from "@/components/PostEditor";
export default async function EditPost({params}:{params:Promise<{id:string}>}){if(!await isAdmin())redirect("/admin/login");const {id}=await params;const p=await prisma.post.findUnique({where:{id}});if(!p)notFound();return <section className="admin-page shell"><p className="eyebrow">ZSEP CMS</p><h1>Edit post</h1><PostEditor initial={p}/></section>}

import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminLogout } from "@/components/AdminLogout";
export default async function Admin(){if(!await isAdmin())redirect("/admin/login");const posts=await prisma.post.findMany({orderBy:{updatedAt:"desc"}});return <section className="admin-page shell"><div className="admin-head"><div><p className="eyebrow">ZSEP CMS</p><h1>Content dashboard</h1></div><div><Link className="button" href="/admin/posts/new">New post</Link><AdminLogout/></div></div><div className="admin-table">{posts.length?posts.map(p=><Link href={`/admin/posts/${p.id}`} key={p.id}><div><strong>{p.title}</strong><span>{p.category} · {p.published?"Published":"Draft"}</span></div><span>{p.updatedAt.toLocaleDateString("en-ZA")}</span></Link>):<p>No posts yet. Create your first article.</p>}</div></section>}

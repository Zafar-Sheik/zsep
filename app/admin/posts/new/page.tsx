import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { PostEditor } from "@/components/PostEditor";
export default async function NewPost(){if(!await isAdmin())redirect("/admin/login");return <section className="admin-page shell"><p className="eyebrow">ZSEP CMS</p><h1>New post</h1><PostEditor/></section>}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Data = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  coverAlt?: string | null;
  seoTitle?: string | null;
  seoDesc?: string | null;
  category?: string;
  published?: boolean;
  featured?: boolean;
};

export function PostEditor({ initial = {} }: { initial?: Data }) {
  const r = useRouter();
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState(initial.coverImage || "");

  async function upload(file: File) {
    const d = new FormData();
    d.append("file", file);
    const res = await fetch("/api/admin/uploads", { method: "POST", body: d });
    const x = await res.json();
    if (res.ok) setImage(x.url);
    else alert(x.error || "Upload failed");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const f = new FormData(e.currentTarget);
    const body = Object.fromEntries(f.entries()) as Record<string, unknown>;
    body.published = f.get("published") === "on";
    body.featured = f.get("featured") === "on";
    body.coverImage = image;
    const url = initial.id
      ? `/api/admin/posts/${initial.id}`
      : "/api/admin/posts";
    const res = await fetch(url, {
      method: initial.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.ok) r.push("/admin");
    else alert((await res.json()).error || "Save failed");
  }

  async function handleDelete() {
    if (!initial.id) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/posts/${initial.id}`, {
      method: "DELETE",
    });
    setSaving(false);
    if (res.ok) r.push("/admin");
    else alert((await res.json()).error || "Delete failed");
  }

  return (
    <form className="editor" onSubmit={submit}>
      <div className="editor-grid">
        <div>
          <label>
            Title
            <input name="title" defaultValue={initial.title} required />
          </label>
          <label>
            Slug
            <input
              name="slug"
              defaultValue={initial.slug}
              placeholder="auto-from-title"
            />
          </label>
          <label>
            Excerpt
            <textarea
              name="excerpt"
              defaultValue={initial.excerpt}
              rows={4}
              required
            />
          </label>
          <label>
            Article content
            <textarea
              name="content"
              defaultValue={initial.content}
              rows={20}
              placeholder="Use blank lines between paragraphs. Start headings with ## or ###"
              required
            />
          </label>
        </div>
        <aside>
          <label>
            Category
            <input
              name="category"
              defaultValue={initial.category || "Insights"}
            />
          </label>
          <label>
            Cover image URL
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/uploads/... or https://..."
            />
          </label>
          <label>
            Upload cover image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            />
          </label>
          <label>
            Image alt text
            <input name="coverAlt" defaultValue={initial.coverAlt || ""} />
          </label>
          <label>
            SEO title
            <input name="seoTitle" defaultValue={initial.seoTitle || ""} />
          </label>
          <label>
            SEO description
            <textarea
              name="seoDesc"
              defaultValue={initial.seoDesc || ""}
              rows={4}
            />
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial.featured}
            />{" "}
            Featured
          </label>
          <label className="check">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initial.published}
            />{" "}
            Published
          </label>
        </aside>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button disabled={saving} className="button">
          {saving ? "Saving…" : "Save post"}
        </button>
        {initial.id && (
          <button
            type="button"
            disabled={saving}
            onClick={handleDelete}
            className="button button-ghost">
            Delete post
          </button>
        )}
      </div>
    </form>
  );
}

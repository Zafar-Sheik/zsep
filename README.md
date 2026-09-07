# ZS Elite Partners — Next.js 16 Website

Production-oriented ZSEP website built with Next.js 16, TypeScript, custom CSS, Framer Motion, Lucide React, Prisma and TiDB.

## Included
- Responsive Home, About, Services, Work, Insights and Contact pages.
- Four service verticals: Marketing & Brand Development, Promotions Agency, Software & Database Solutions, CCTV Installation.
- SEO metadata, robots and dynamic sitemap.
- Framer Motion reveal animations with clean client-component boundaries for adding GSAP/ScrollTrigger later.
- Contact API that stores leads in TiDB and emails `info@zsep.co.za` with Resend.
- Password-protected CMS at `/admin` for blog posts, SEO fields, publishing and cover images.
- Simple image uploads to `public/uploads` plus direct image URL support.

## Setup
```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

### TiDB
Use a TiDB Cloud MySQL connection URL as `DATABASE_URL`. Prisma uses `provider = "mysql"` because TiDB speaks the MySQL protocol.

### Email
Configure `RESEND_API_KEY`, verify the sender domain, and keep `CONTACT_TO_EMAIL="info@zsep.co.za"`.

### CMS
Set strong `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`, then visit `/admin/login`.

### Image storage
The included uploader is suitable for a persistent Node/VPS deployment. On serverless hosting use Cloudflare R2, S3 or Cloudinary and keep storing the resulting URL in `coverImage`.

### GSAP later
Add GSAP only inside client components, register ScrollTrigger there, wrap timelines in `gsap.context()`, and clean them up on unmount. The current Framer Motion usage is isolated so GSAP can be introduced section-by-section without rewriting the app.

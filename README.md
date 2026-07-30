# Yassin Koubeisy | Portfolio

Personal portfolio and project case studies. Built with Next.js App Router, TypeScript,
Tailwind CSS and Framer Motion.

Live site: set `NEXT_PUBLIC_SITE_URL` once the domain is live.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Nothing in `.env.local` is committed.

| Variable | Required | Purpose |
| --- | --- | --- |
| `GMAIL_USER` | yes | Gmail account that sends contact form messages |
| `GMAIL_APP_PASSWORD` | yes | Google App Password, not the account password |
| `NEXT_PUBLIC_SITE_URL` | no | Public URL used for metadata, sitemap and robots. Falls back to the Vercel deployment URL |

## Structure

```
app/
  layout.tsx              root layout, fonts, metadata
  page.tsx                home page composition
  globals.css             design tokens and component classes
  icon.svg                favicon
  opengraph-image.tsx     social preview, generated at build time
  robots.ts, sitemap.ts   crawler files
  api/contact/route.ts    contact form handler
  projects/[slug]/        generated case study pages
components/               section components
lib/
  projects.ts             case study content, single source of truth
  site.ts                 site URL and shared metadata strings
public/                   resume PDF and static assets
```

## Adding a project

Add an entry to the `projects` array in `lib/projects.ts`. The home page index,
the case study page, the sitemap and the static params all read from it, so no
other file needs touching.

## Notes

- The contact endpoint escapes user input before it reaches the HTML email, validates
  and length caps every field, carries a honeypot field, and rate limits per IP.
- All animation respects `prefers-reduced-motion`.
- Colours live as CSS variables in `app/globals.css` and as named Tailwind colours in
  `tailwind.config.ts`. Change them in both places.

# KhadijaZaman.com — Minimal SEO Portfolio

Goal: a minimalistic, high-converting portfolio site for **Khadija Zaman** that communicates thought leadership in **SEO, LLM Visibility (LLM SEO), GEO, AEO, and marketing automation**.

## Completed features
- **Single-page, fast-loading portfolio** (`index.html`)
- Minimalist *Brutalist × Swiss* design: bold typography, strategic whitespace, strong contrast, accent gradients
- Clear conversion path with repeated CTAs (Book a consult / Request roadmap)
- Sections included:
  - Hero (value prop + CTAs)
  - Philosophy/About
  - Expertise areas
  - Featured work / case studies (templated examples)
  - Insights / thought leadership teasers
  - Contact CTA (email/phone/LinkedIn) + simple form
- Mobile navigation (hamburger menu)
- Subtle reveal-on-scroll animations (respects `prefers-reduced-motion`)
- On-page SEO basics:
  - Title, meta description, canonical
  - Open Graph/Twitter meta
  - JSON-LD schema for **Person** and **WebSite**

## Entry URIs (routes)
Static site:
- `/` → main page

In-page anchors:
- `/#work`
- `/#insights`
- `/#about`
- `/#contact`

External links:
- LinkedIn: `https://www.linkedin.com/in/khadija-zaman-2628751b1/`
- Email: `mailto:khadijarafiqzaman@gmail.com`
- Phone: `tel:+923332364553`

## Features not yet implemented
- Real case studies (client names, screenshots, metrics, links)
- Blog/insights CMS (static markdown or table-backed listing)
- Lead capture integrations (Calendly, Typeform, etc.)
- Dedicated pages (e.g., `/services`, `/speaking`, `/newsletter`)

## Recommended next steps
1. Replace placeholder case studies with real projects + measurable outcomes.
2. Add a **Calendly** (or similar) booking link to increase conversions.
3. Add a lightweight insights page with 5–10 short posts targeting GEO/AEO/LLM visibility queries.
4. Add a simple “Work with me” section clarifying offers (Audit, Roadmap, Retainer).

## Tech
- Pure **HTML/CSS/JavaScript** (no build step)
- Google Fonts via CDN (Inter + IBM Plex Mono)

## Public URLs
- Production site: `https://khadijazaman.com/`

## Data models / storage
- None (static-only). No RESTful Table API used.

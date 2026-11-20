# RENCE Home Service Massage

A mobile-first, single-page Next.js website for RENCE in Bulacan. The brand uses the supplied forest green, mint, and off-white palette, Manrope and Space Grotesk, a background-removed hero portrait, supporting sculptural CSS artwork, and Framer Motion. The site supports direct-contact booking now and a Google Appointment Schedule later.

## Run locally

Use Node.js 22 LTS or newer (Next.js requires at least 20.9). Install from the lockfile:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Production verification:

```sh
npm run typecheck
npm run build
npm start
```

The build fetches Google Fonts, then self-hosts the font files. Network access is required during the first build. Keep `package-lock.json` committed for reproducible installs.

## Business information

`lib/business.ts` is the source for contact details, service areas, prices, techniques, and approved testimonials. The verified prices are ₱699 / 60 minutes, ₱900 / 90 minutes, and ₱1,000 / Ventosa. Ventosa duration is intentionally unspecified. Availability is subject to confirmation; no automatic 24/7 slots are created. Service buttons scroll to the booking section and do not preselect a service in Google.

## Photography and logo

The owner supplied two portrait references and the official logo during development. At the owner’s later request, the full-body mirror photograph was used to generate a transparent cutout with the built-in image-generation tool. `public/images/generated/rence-hero-cutout.webp` is the optimized 123 KB hero asset; it replaces the room background and sits beside the hero copy. The full original photograph is not publicly served. Supporting service panels remain branded CSS artwork pending the separate campaign-photo collection. The official supplied logo appears in the desktop header and footer; a simplified text wordmark and R touch/favicon remain on small surfaces.

Place private originals under `reference-assets/rence-photo/` and `reference-assets/visual-references/`. This entire directory is ignored by Git and sits outside `public/`. Never use these files directly in components or copy originals to public assets. Use the supplied identity reference to generate new, consistent campaign photography. See `docs/image-generation-plan.md` for asset-specific prompts, crops, and quality checks.

Export approved generated images to `public/images/generated/`, then set their paths in `lib/assets.ts`. All entries start as `null`; this prevents broken image requests. The component automatically switches from artwork to optimized Next.js images. Keep names from the image plan. Set `heroDesktop` and `heroMobile` for responsive hero art direction. The portrait must remain recognizably Rence. No invented certifications or uniforms.

The supplied logo is at `public/images/rence-logo.png`. Desktop and footer placements preserve its design. Replace `app/icon.svg` and `app/apple-icon.tsx` if a separate official small-format mark is supplied. Brand social sharing artwork is in `app/opengraph-image.tsx`.

## Testimonials

`reviews` in `lib/business.ts` contains five anonymous excerpts transcribed from screenshots supplied by the owner. The review viewer has manual previous/next controls, reduced-motion transitions, and a polite live region. It never auto-advances. Original screenshots stay in the ignored `reference-assets/review-sources/` directory. Duplicate messages and messages naming Enzo are excluded pending clarification. Add only genuine, approved excerpts using `{ quote, author, source }`. Do not invent customer names or aggregate star ratings.

## Google Calendar

Copy `.env.example` to `.env.local` for local configuration, or set these public variables in Vercel and redeploy:

- `NEXT_PUBLIC_GOOGLE_APPOINTMENT_BOOKING_URL`: the owner's actual HTTPS Google Appointment Schedule URL. Supported hosts: `calendar.google.com` and `calendar.app.google`. Leave blank until supplied. Invalid values fall back to contact booking.
- `NEXT_PUBLIC_SHOW_AVAILABILITY_CALENDAR`: `false` by default. Set `true` only after checking calendar sharing and verifying that it exposes no private client information.

`lib/config.ts` contains separate `GOOGLE_CALENDAR_EMBED_URL` and `GOOGLE_APPOINTMENT_BOOKING_URL` values. The supplied calendar is a **view-only calendar**, not an appointment form. It is hidden by default because its sharing settings and contents have not been verified. When enabled, it is separately labeled as view-only and loaded on expansion.

When the Appointment Schedule URL is configured, the site displays an iframe and an external fallback link. Google's page controls confirmation. External embed restrictions or browser settings may require the fallback. Configure the actual working schedule, Asia/Manila timezone, customer-home location, travel/preparation buffers, service details, and confirmation rules in Google Calendar itself. This project does not create appointments or alter Google calendar settings. No API key or backend is needed.

The fallback offers phone, SMS, Viber, and Telegram. Viber needs its app; its number and an SMS fallback are visible. These links open the appropriate app and never send a message automatically. Real device/app dispatch requires a phone with those apps installed.

## Vercel deployment

1. Import the existing `engrjakeconcha/rence` repository into Vercel. Select the Next.js framework preset and the repository root (`./`).
2. Use `npm ci` as install command and `npm run build` as build command; keep the standard Next.js output setting.
3. Use a supported Node.js LTS version. Add the public booking variables if available.
4. Deploy and check the Vercel preview on desktop and mobile. Real appointment submission must be verified with the owner once the actual booking URL is provided.
5. Add `rencemassage.world` in Vercel Domains. Apply the exact DNS records Vercel provides through the domain registrar. Verify HTTPS and the chosen canonical domain.

The code uses `https://rencemassage.world` as its canonical, sitemap, and structured-data domain. Vercel deployment and DNS changes are **not** performed by this repository. Protect nonproduction deployments with Vercel deployment protection or disable indexing in the hosting environment.

## SEO, accessibility, performance

Semantic sections, a single H1, labeled navigation, skip link, visible keyboard focus, reduced-motion support, mobile safe-area contact bar, metadata, Open Graph image, robots, sitemap, and fact-based Organization/Service structured data are included. No fabricated address, credentials, ratings, or fixed working hours. Photography uses Next.js optimization and lazy loading except for the hero. Only Framer Motion is installed for motion; GSAP is unnecessary for this implementation. Motion does not hide content if JavaScript is unavailable.

Public environment values are bundled into the client. Never place credentials in them. Security response headers are configured in `next.config.ts`. This site has no customer database, analytics tracker, payment collection, or custom personal-information form.

## Release checklist

- Complete the optional supporting campaign-photo collection from the supplied references; the requested hero cutout is complete.
- Confirm final brand assets and excerpt selections; official logo and five supplied review excerpts are integrated.
- Supply and test the Google Appointment Schedule URL, including actual schedules and travel buffers.
- Check calendar privacy before optionally exposing the view-only calendar.
- Verify call, SMS, Viber, and Telegram on real mobile devices.
- Complete Vercel account setup, deploy, and configure domain DNS.

See `docs/verification.md` for the checks completed during implementation and any remaining verification limits.

## Integration checks

With the production server running on port 3000, run `npm test`. Set `TEST_BASE_URL` to check another deployment. The checks request the real rendered page and SEO/icon endpoints, verify exact contact links and schema pricing, exclude private reference paths and invented ratings, and assert the missing-booking fallback. If checking a deployment with online booking enabled, also set its `NEXT_PUBLIC_GOOGLE_APPOINTMENT_BOOKING_URL` when invoking the check.

## Video section

`components/VideoSection.tsx` displays the owner's two supplied full-length MP4 clips from `public/videos/` (2:30 and 2:41). They use native controls, `playsInline`, `preload="none"`, lightweight WebP poster frames, descriptions, and direct-file fallbacks. No autoplay or automatic audio. Original audio is preserved; a speech transcript/caption file was not supplied, so spoken-audio captions remain a follow-up if required. Keep video download sizes in mind when replacing the clips. The initial page load fetches posters rather than the full 15 MB of video.

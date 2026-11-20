# RENCE Home Service Massage

A mobile-first, single-page Next.js website for RENCE in Bulacan. The brand uses the supplied forest green, mint, and off-white palette, Manrope and Space Grotesk, a background-removed hero portrait, supporting sculptural CSS artwork, and Framer Motion. The site collects booking requests through a server-side Resend email endpoint, with an optional Telegram notification.

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

`lib/business.ts` holds contact details, services, prices and approved testimonials. Products: ₱699 / 60 minutes, ₱900 / 90 minutes, and ₱1,000 / 90-minute Ventosa. Requests are welcome 24/7 and require Rence’s confirmation. Service buttons preselect the matching product in the booking form. No appointment or calendar slot is automatically confirmed.

## Photography and logo

The owner supplied two portrait references and the official logo during development. At the owner’s later request, the full-body mirror photograph was used to generate a transparent cutout with the built-in image-generation tool. `public/images/generated/rence-hero-scrubs.webp` is the current forest-green and mint scrubs cutout; it replaces the room background and sits beside the hero copy. The full original photograph is not publicly served. A generated Rence portrait and a matching session-preparation image are also integrated. All three service cards now use generated campaign photography: a fully clothed massage session, shoulder technique close-up, and Ventosa equipment still life. The official supplied logo appears in the desktop header and footer; a simplified text wordmark and R touch/favicon remain on small surfaces.

Place private originals under `reference-assets/rence-photo/` and `reference-assets/visual-references/`. This entire directory is ignored by Git and sits outside `public/`. Never use these files directly in components or copy originals to public assets. Use the supplied identity reference to generate new, consistent campaign photography. See `docs/image-generation-plan.md` for asset-specific prompts, crops, and quality checks.

Export approved generated images to `public/images/generated/`, then set their paths in `lib/assets.ts`. All entries start as `null`; this prevents broken image requests. The component automatically switches from artwork to optimized Next.js images. Keep names from the image plan. Set `heroDesktop` and `heroMobile` for responsive hero art direction. The portrait must remain recognizably Rence. No invented certifications or badges; the scrubs outfit was requested by the owner.

The supplied logo is at `public/images/rence-logo.png`. Desktop and footer placements preserve its design. Replace `app/icon.svg` and `app/apple-icon.tsx` if a separate official small-format mark is supplied. Brand social sharing artwork is in `app/opengraph-image.tsx`.

## Testimonials

`reviews` in `lib/business.ts` contains five anonymous excerpts transcribed from screenshots supplied by the owner. The review viewer has manual previous/next controls, reduced-motion transitions, and a polite live region. It never auto-advances. Original screenshots stay in the ignored `reference-assets/review-sources/` directory. Duplicate messages and messages naming Enzo are excluded pending clarification. Add only genuine, approved excerpts using `{ quote, author, source }`. Do not invent customer names or aggregate star ratings.

## Vercel deployment

1. Import the existing `engrjakeconcha/rence` repository into Vercel. Select the Next.js framework preset and the repository root (`./`).
2. Use `npm ci` as install command and `npm run build` as build command; keep the standard Next.js output setting.
3. Use a supported Node.js LTS version. Add the server-only notification variables listed below.
4. Deploy and check the Vercel preview on desktop and mobile. Verify the booking form, notification delivery and subject-to-confirmation copy.
5. Add `rencemassage.world` in Vercel Domains. Apply the exact DNS records Vercel provides through the domain registrar. Verify HTTPS and the chosen canonical domain.

The code uses `https://rencemassage.world` as its canonical, sitemap, and structured-data domain. Vercel deployment and DNS changes are **not** performed by this repository. Protect nonproduction deployments with Vercel deployment protection or disable indexing in the hosting environment.

## SEO, accessibility, performance

Semantic sections, a single H1, labeled navigation, skip link, visible keyboard focus, reduced-motion support, mobile safe-area contact bar, metadata, Open Graph image, robots, sitemap, and fact-based Organization/Service structured data are included. No fabricated address, credentials, ratings, or fixed working hours. Photography uses Next.js optimization and lazy loading except for the hero. Only Framer Motion is installed for motion; GSAP is unnecessary for this implementation. Motion does not hide content if JavaScript is unavailable.

Public environment values are bundled into the client. Never place credentials in them. Security response headers are configured in `next.config.ts`. The booking form collects the four requested contact/service fields and emails them to Rence. There is no customer database, analytics tracker or payment collection.

## Release checklist

- Complete the optional supporting campaign-photo collection from the supplied references; the requested hero cutout is complete.
- Confirm final brand assets and excerpt selections; official logo and five supplied review excerpts are integrated.
- Configure Telegram bot credentials and verify delivery to @Florence_24F.
- Verify call, SMS, Viber, and Telegram on real mobile devices.
- Complete Vercel account setup, deploy, and configure domain DNS.

See `docs/verification.md` for the checks completed during implementation and any remaining verification limits.

## Integration checks

With the production server running on port 3000, run `npm test`. Set `TEST_BASE_URL` to check another deployment. The checks request the real rendered page and SEO/icon endpoints, verify exact contact links and schema pricing, exclude private reference paths and invented ratings, and verify booking form fields and JCIT credits. Run `node scripts/check-booking.mjs` for server-route tests with mocked providers.

## Video section

`components/VideoSection.tsx` displays the owner's two supplied full-length MP4 clips from `public/videos/` (2:30 and 2:41). At the owner’s request they autoplay, loop, and start muted, with native controls, `playsInline`, metadata preloading, lightweight WebP poster frames, descriptions, and direct-file fallbacks. Browser autoplay restrictions can require a manual play; native controls remain available. Original audio is preserved; a speech transcript/caption file was not supplied, so spoken-audio captions remain a follow-up if required. Keep video download sizes in mind when replacing the clips. Autoplay can download the full clips as they play; the combined video size is about 15 MB.

## Verified preview and local filesystem note

The final production build, integration checks, requested viewport widths, review controls, and both video players passed. The development machine intermittently stalled while reading dependency files from the Documents checkout. Verification used a clean temporary copy of the same source and lockfile in `/tmp/rence-qa`; no workaround is needed in the hosted source. If local dependency reads stall again, use a local checkout outside the affected folder and run `npm ci` there.

Hosting choice confirmed: **Vercel with GitHub source**. The owner's `CNAME` file is preserved, but Vercel domain routing is configured in Vercel's dashboard. Use the project-specific DNS values shown after adding the domain; GitHub Pages DNS records are for GitHub Pages hosting and do not configure Vercel.

## Booking request notifications

The form collects name, contact number, home address and product. `app/api/booking/route.ts` validates input server-side and sends plain-text email to `massagehomeservice07@gmail.com`. Secrets stay in Vercel environment variables and never enter client code. The form reports success only after Resend accepts the email; this is not a guarantee of inbox delivery or appointment confirmation. Resend idempotency keys prevent duplicate emails on retries. Basic origin checks, a honeypot, request limits and a per-instance IP throttle are included; the throttle is not shared across serverless instances.

Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (verified sender domain) and `BOOKING_NOTIFICATION_EMAIL` in Vercel production. Current sender: `RENCE Bookings <bookings@jcit.digital>`; sending DNS is verified, while the optional tracking CNAME needs repair. No tracking is requested by this endpoint.

Telegram additionally needs `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. @Florence_24F must start the bot first. A personal username cannot replace a private chat ID. Both values are server-only. Email remains the primary channel; Telegram failures are logged without customer details and do not cause a misleading retry prompt after email acceptance. No Telegram delivery is claimed until these credentials are configured and verified.

JCIT Services footer credit links to https://jcit.digital; RENCE retains its copyright. The hero now uses the generated forest-green/mint scrubs cutout (`rence-hero-scrubs.webp`).

Google Calendar booking has been replaced by this form. No appointment schedules need to be created.

# Verification record

## Completed

- Repository inspected: initially empty, default branch `main`; existing local Git identity preserved, official remote configured.
- Dependencies installed from npm with a lockfile; installation audit reported zero vulnerabilities.
- Final production build passed with all eight static routes generated, including sitemap, robots, favicon, touch icon, and social image. The media-inclusive source was verified from a clean copy in `/tmp/rence-qa` with the same lockfile to avoid intermittent read stalls in the Documents checkout.
- TypeScript checks passed before and after the media and testimonial components were added.
- Supplied MP4 metadata inspected: H.264/AAC, 360 × 640, durations 2:30 and 2:41. Sampled frames show professional home-service massage. Full files retained; lightweight poster frames exported.
- Hero cutout generated with built-in imagegen and exported as 123 KB WebP with alpha. Matching profile (42 KB) and session-preparation (90 KB) campaign images were generated and integrated. All three service cards now use final generated photographs: whole-body session (143 KB), shoulder technique (96 KB), and equipment-only Ventosa (85 KB). Their crops and successful browser decoding were verified, and the updated production build and integration checks passed.
- Original portraits and review sources retained outside public files and ignored by Git.
- Exact service prices, contact links, missing-booking state, and separate calendar configuration are implemented. No address, credentials, fake customer names, or aggregate ratings are invented.
- Source and media are uploaded through the authenticated GitHub connector because command-line Git authentication is unavailable.

## Final integration and browser checks

- `npm test` passed against the running production build: rendered page, exact contact hrefs, section anchors, schema prices, missing-booking fallback, private reference exclusion, robots/sitemap/social/icon endpoints, response headers, two looping, muted autoplay video elements with metadata preloading, hero asset, and byte-range MP4 responses.
- Browser layout checks passed at 375, 390, 430, 768, 1440, and 1920 pixels; document width matched viewport width with no horizontal overflow. Hero composition visually reviewed on desktop and 375-pixel mobile.
- Both videos played through native browser controls: readyState 4, no media error, durations 150.3 and 161.168 seconds. The final requested autoplay behavior was then verified: both players had autoplay=true, loop=true, muted=true and began playing automatically as they became visible. No video play control was used in the autoplay check.
- Next-review control changed the excerpt and count from 01/05 to 02/05. Booking CTA navigated to `#booking`.
- Browser console showed no warnings or errors during the final verification.
- Hero and header logo loaded successfully. Footer logo uses lazy loading.
- Final full-height portrait measured the same height as the hero at all requested viewport sizes. Desktop and mobile compositions were visually reviewed; no horizontal overflow.
- Final screenshots saved at `output/hero-fullscreen-desktop.jpg` and `output/hero-mobile-full.jpg` (excluded from Git).
- Reduced-motion behavior is implemented in Framer Motion and CSS; the user's system motion setting was not changed during testing.

## Remaining verification limits

The Documents checkout showed intermittent dependency read stalls and initially empty reads. A clean temporary copy installed dependencies in four seconds and built successfully; repository source was preserved. The browser preview runs from that verified temporary copy. Original staged development commits are retained on the local `local-build-history` branch; local `main` tracks the connector-published GitHub history.

Google Appointment Schedule cannot be tested until the owner supplies the actual URL. Calendar sharing/privacy settings have not been checked; the view-only embed is disabled. Phone/Viber/SMS app dispatch needs testing on an actual configured mobile device. Vercel deployment and custom-domain DNS have not been performed.

Product-card photography follow-up: all three rendered images loaded successfully in the browser; mobile card layout had no horizontal overflow. The Ventosa still life contains equipment only. Final prompt set: `docs/product-card-prompts.json`. Card preview: `output/service-card-preview.jpg`.

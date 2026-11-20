# RENCE campaign photography plan

Status: waiting for the actual Rence identity photograph and supporting visual references. No photos were supplied or generated. CSS artwork is used until approved derived files exist. Do not generate an invented substitute for Rence. Image generation is available in the development environment, but identity-based generation must wait for the required reference.

## Shared direction

Use the owner's actual Rence photograph as the identity reference for all shots featuring him. Preserve face, skin tone, age, hair, facial structure, natural proportions, and overall physical appearance. Preserve the same identity across the collection. Deep forest green setting (#07150D / #10291B), soft directional light, subtle mint accents (#8CF5AE), natural skin texture, realistic anatomy, restrained cinematic contrast, editorial framing. Professional home-service wellness campaign for male clients. No embedded text, logos, invented qualifications, sexualized posing, plastic skin, exaggerated muscles, or visible client identities without permission. Treatments and equipment must be plausible. Review hands, contact points, cupping placement, and draping carefully.

The source reference itself must never appear on the live website. Keep references in the ignored nonpublic `reference-assets/` directory. Generate new compositions, review with owner, export optimized WebP images, and update `lib/assets.ts`. Never mark an asset complete until its file exists and has been visually reviewed.

## Asset prompts and delivery

Each prompt below extends the shared direction and the actual supplied references.

| Asset | New composition / prompt | Target export | Config key |
| --- | --- | --- | --- |
| `rence-hero-desktop.webp` | Rence in a natural confident stance on the right side of a dark forest-green professional wellness environment. Premium commissioned editorial portrait, soft key light on his face, restrained mint edge light, true skin texture. Leave the left 50% dark and quiet for oversized website text. No uniform implying credentials. | 2400 × 1600, landscape; aim below 350 KB | heroDesktop |
| `rence-hero-mobile.webp` | New vertical crop/composition of the same campaign and identity. Place Rence toward the lower right with clear upper-left negative space for headline and CTA. Retain face visibility under responsive crops. | 1000 × 1500, portrait; aim below 200 KB | heroMobile |
| `rence-profile.webp` | Recognizably Rence, waist-up relaxed portrait, natural expression, eye-level camera, deep-green background, understated plain professional clothing, soft directional light. No badges, certificates, or invented logo. | 1000 × 1200; aim below 180 KB | profile |
| `massage-setup.webp` | Rence preparing a portable massage table in a tidy home interior, clean dark-green linens, organized supplies. Realistic equipment, natural working posture, discreet and professional framing. | 1400 × 1000; aim below 180 KB | setup |
| `massage-whole-body.webp` | Professional whole-body massage scene in a private home. Male client appropriately draped; Rence applying a realistic back massage technique. Focus on calm professional care and believable hand placement; no sexualized framing. | 1400 × 1000; aim below 180 KB | wholeBody |
| `massage-ventosa.webp` | Editorial detail of appropriate cupping equipment and a professional, plausibly staged Ventosa treatment on a properly draped male client. Natural light and skin texture, no extreme marks or claims. Confirm accurate equipment and placement with the therapist. | 1400 × 1000; aim below 180 KB | ventosa |
| `massage-technique.webp` | Close-up of Rence's hands performing a plausible massage technique on the shoulder or upper back of a draped male client. Anatomically accurate fingers, professional contact, shallow but realistic depth of field. | 1400 × 1000; aim below 180 KB | technique |
| `massage-detail.webp` | Still life of clean folded deep-green towels, massage oil in an unbranded bottle, and neatly prepared mobile massage equipment. Soft mint reflected light, editorial still-life composition, visible material texture. This image can also represent the premium wellness environment. | 1400 × 1000; aim below 180 KB | detail |

Setup and detail keys are prepared for future supporting placements; the initial layout uses hero, profile, wholeBody, technique, and ventosa. Do not add unnecessary imagery merely to fill the page.

## Acceptance checks

1. Rence's identity is consistent with the real reference, without invented age or credentials.
2. Treatment scenes are professional, properly draped, and anatomically plausible.
3. Lighting, palette, and camera treatment match across all images.
4. Desktop and mobile headline crops leave Rence's face unobstructed.
5. Export strips location metadata and contains no original reference file.
6. Compare actual optimized output on mobile and desktop; check contrast behind hero text.
7. Only then replace null entries in `lib/assets.ts` with `/images/generated/<filename>.webp`.

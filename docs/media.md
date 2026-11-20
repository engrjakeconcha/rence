# Integrated owner media

- Hero: the owner requested his full-body reference photo as the hero, then requested background removal and placement beside the headline. This later instruction supersedes the original campaign-hero prompt. The built-in image-generation tool created the transparent cutout; ffmpeg exported WebP with alpha at quality 88. Final: `public/images/generated/rence-hero-cutout.webp`. Original inputs remain private under ignored `reference-assets/`.
- Supporting photos: generated Rence portrait and session-preparation image at `public/images/generated/rence-profile.webp` and `massage-setup.webp`. Additional treatment-image generation returned a tool error; those service panels continue to use branded artwork.
- Logo: exact supplied design, `public/images/rence-logo.png`. No redesign.
- Videos: full supplied clips at `public/videos/rence-session-01.mp4` and `rence-session-02.mp4`. Native controls, original audio available on demand, autoplay, continuous looping, muted by default, metadata preloading. Posters are frames extracted at 10 seconds. Short visual descriptions accompany both. Speech captions have not been supplied or independently transcribed.
- Reviews: five anonymous excerpts from supplied screenshots 03, 04, 05, 08, and 09. Sources are stored outside public assets in ignored `reference-assets/review-sources/`. Review excerpts preserve the supplied wording and do not fabricate names or aggregate ratings. Duplicate images, ambiguous wording, and messages naming Enzo were not included.

## Executed image prompt

Mode: built-in imagegen, transparent background, reference image: the owner's full-body mirror photograph.

> Use case: background-extraction. Create a clean transparent-background cutout of the man in the supplied mirror photograph for the right side of the RENCE website hero. Remove ALL room background, ceiling, doorway, mirror frame, reflections behind him, wall, sink, and surrounding objects. Preserve the visible man EXACTLY: same recognizable face partially obscured by phone, hair, glasses, skin tone, shirtless torso, body proportions, dark patterned shorts, pose, hands, and the phone he holds. Do not invent or change his face, physique, age, or outfit. Do not add any body parts beyond the supplied visible boundaries. Center the isolated subject with close transparent margins around the visible body. Natural clean hair and skin edges, no halo, no colored outline, no text, no logos, no shadows baked into a background. Output a genuinely transparent PNG with the entire visible subject from hair to shorts included.

The generated PNG is retained in the user's generated-image library. The consuming website references the copied, optimized workspace WebP; it does not depend on a temporary attachment path or the image library directory.

// Set an entry to its public /images/generated/*.webp path once its actual file exists.
// Private references stay out of public paths. The owner requested a background-removed cutout for the hero.
export const generatedAssets: Record<string, string | null> = {
  heroDesktop: "/images/generated/rence-hero-cutout.webp", heroMobile: null, profile: "/images/generated/rence-profile.webp", setup: "/images/generated/massage-setup.webp",
  wholeBody: "/images/generated/massage-whole-body.webp", ventosa: "/images/generated/massage-ventosa.webp", technique: "/images/generated/massage-technique.webp", detail: null,
};

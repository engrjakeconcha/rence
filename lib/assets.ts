// Set an entry to its public /images/generated/*.webp path once its actual file exists.
// Never point these at reference-assets or original identity photographs.
export const generatedAssets: Record<string, string | null> = {
  heroDesktop: null, heroMobile: null, profile: null, setup: null,
  wholeBody: null, ventosa: null, technique: null, detail: null,
};

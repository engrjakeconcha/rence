import type { MetadataRoute } from 'next';
import { business } from '@/lib/business';
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: business.domain, changeFrequency: 'monthly', priority: 1 }]; }

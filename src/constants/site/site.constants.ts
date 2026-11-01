import type { ShareImage } from './site.types';

// Where the site is served (brief section 2). Link previews and search engines need absolute
// URLs, so the canonical link, og:url, og:image and the sitemap are built from it.
// public/robots.txt repeats it, because a static file cannot import it.
export const SITE_URL: string = 'https://rafalciecwierz.github.io';

// The page addresses. GitHub Pages serves 404.html for every address that has no file.
export const PAGE_PATHS = {
  home: '/',
  notFound: '/404.html',
} as const;

// The file a folder URL is served from: "/" is "/index.html".
export const INDEX_FILE_NAME: string = 'index.html';

// 1200×630 is the size LinkedIn, Facebook and X show as a large preview.
export const SHARE_IMAGE: ShareImage = {
  path: '/og-image.png',
  width: 1200,
  height: 630,
};

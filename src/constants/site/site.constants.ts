import type { ShareImage } from './site.types';

export const SITE_URL: string = 'https://rafalciecwierz.github.io';

export const PAGE_PATHS = {
  home: '/',
  notFound: '/404.html',
} as const;

export const INDEX_FILE_NAME: string = 'index.html';

export const SHARE_IMAGE: ShareImage = {
  path: '/og-image.png',
  width: 1200,
  height: 630,
};

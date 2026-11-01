import type { Seo } from '../seo.types';

// Brief section 9: the home title as written there, its description from the tagline and
// availability line. The image alt text and the 404 page's head are new copy (task 3.10).
export const seo: Seo = {
  imageAlt:
    'Rafał Ciećwierz, Frontend Engineer, in lit letters over a city skyline at night',
  home: {
    title: 'Rafał Ciećwierz — Frontend Engineer (React & TypeScript)',
    description:
      'React & TypeScript · 5+ years building production apps. Open to frontend roles (React / TypeScript), remote or hybrid.',
  },
  notFound: {
    title: 'Page not found — Rafał Ciećwierz',
    description:
      'This address leads nowhere. The portfolio of Rafał Ciećwierz, Frontend Engineer, is one click away.',
  },
};

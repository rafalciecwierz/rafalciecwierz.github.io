// The <title> and meta description of one page.
export type PageSeo = {
  title: string;
  description: string;
};

export type Seo = {
  // The alt text of the sharing image (public/og-image.png), the same on every shared page.
  imageAlt: string;
  home: PageSeo;
  notFound: PageSeo;
};

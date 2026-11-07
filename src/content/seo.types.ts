export type PageSeo = {
  title: string;
  description: string;
};

export type Seo = {
  imageAlt: string;
  home: PageSeo;
  notFound: PageSeo;
};

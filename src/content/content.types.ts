export type Seo = {
  title: string;
  description: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
};

// The shape of the whole site's copy and data. Every locale is a value of this type.
export type Content = {
  seo: Seo;
  profile: Profile;
};

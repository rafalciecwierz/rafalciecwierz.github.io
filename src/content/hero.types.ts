// The line above the sign: "Summit · Night session · Rooftop · 21:40". The time is the reader's
// own, so it is added in the browser after hydration, not written into the pre-rendered HTML.
export type HeroMeta = {
  place: string;
  session: string;
  spot: string;
};

export type Hero = {
  meta: HeroMeta;
  downloadCv: string;
  getInTouch: string;
  startClimb: string;
};

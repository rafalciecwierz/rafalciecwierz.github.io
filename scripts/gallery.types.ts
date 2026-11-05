// One factual correction in the published prototypes (scripts/gallery.corrections.ts).
export type GalleryCorrection = {
  // The exact text in the prototypes' draft copy.
  find: string;
  // The final wording from docs/PROJECT_BRIEF.md.
  replace: string;
  // How many times `find` appears across all published prototypes. The build fails on any
  // other number, so a correction cannot stop working silently.
  count: number;
};

// What the draft note says on one kind of published page: the full sentence on wide screens,
// a short one where the note must stay one line.
export type DraftNoteText = {
  wide: string;
  narrow: string;
};

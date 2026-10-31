// solid: a highlight, e.g. "Promoted" or "Live". caution: work in progress, with hazard
// stripes. muted: something finished, e.g. "Archived".
export type BadgeVariant = 'solid' | 'caution' | 'muted';

export type BadgeProps = {
  variant: BadgeVariant;
  children: string;
};

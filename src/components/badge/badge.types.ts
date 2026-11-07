export type BadgeVariant = 'solid' | 'caution' | 'muted';

export type BadgeProps = {
  variant: BadgeVariant;
  children: string;
};

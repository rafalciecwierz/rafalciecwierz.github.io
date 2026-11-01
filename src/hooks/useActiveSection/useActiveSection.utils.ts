// The section to mark: the first one, in page order, that is in the reading band now. None
// when the band is over a section outside the navigation (the hero, From the team).
export function pickActiveSection(
  sectionIds: readonly string[],
  visibleIds: ReadonlySet<string>,
): string | null {
  return sectionIds.find((id: string): boolean => visibleIds.has(id)) ?? null;
}

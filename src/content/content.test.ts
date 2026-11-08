import { describe, expect, it } from 'vitest';

import { collectLeaves, type Leaf } from '@/utils';

import type { Job, Period } from './career.types';
import type { Content } from './content.types';
import { en } from './en';
import type { Tool, ToolGroup } from './stack.types';

const LOCALES: readonly { locale: string; content: Content }[] = [
  { locale: 'en', content: en },
];

const BUILT_PATHS: readonly string[] = ['/design/'];
const PUBLIC_FILES: readonly string[] = Object.keys(
  import.meta.glob('/public/**/*'),
).map((file: string): string => file.replace(/^\/public/, ''));

const RICH_TEXT_PART: RegExp = /\]\[\d+\]$/;

function isServedFile(link: string): boolean {
  return BUILT_PATHS.includes(link) || PUBLIC_FILES.includes(link);
}

const LISTED_TODOS: readonly RegExp[] = [];

function startMonths({ start }: Period): number {
  return start.year * 12 + start.month;
}

function endMonths({ end }: Period): number {
  return end.year * 12 + end.month;
}

describe.each(LOCALES)(
  'content ($locale)',
  ({ content }: { locale: string; content: Content }): void => {
    const leaves: readonly Leaf[] = collectLeaves(content);

    it('has no empty strings and no stray spaces', (): void => {
      for (const { path, value } of leaves) {
        if (typeof value === 'string') {
          expect(value, path).not.toBe('');
          expect(value, path).not.toContain('  ');
          if (!RICH_TEXT_PART.test(path)) {
            expect(value, path).toBe(value.trim());
          }
        }
      }
    });

    it('gives every job, project, quote and tool group a unique id', (): void => {
      const ids: unknown[] = leaves
        .filter((leaf: Leaf): boolean => leaf.path.endsWith('.id'))
        .map((leaf: Leaf): unknown => leaf.value);

      expect(ids.length).toBeGreaterThan(0);
      expect(new Set<unknown>(ids).size).toBe(ids.length);
    });

    it('keeps every link in a field named …Url or src, absolute or pointing to a served file', (): void => {
      for (const { path, value } of leaves) {
        if (typeof value !== 'string') {
          continue;
        }
        const isUrlField: boolean =
          path.endsWith('Url') || path.endsWith('.src');
        const isLinkLike: boolean = /^(https?:|\/)/.test(value);

        expect(isLinkLike, path).toBe(isUrlField);
        if (isUrlField) {
          expect(
            value.startsWith('https://') || isServedFile(value),
            path,
          ).toBe(true);
        }
      }
    });

    it('uses null only for listed TODOs', (): void => {
      const nullPaths: string[] = leaves
        .filter((leaf: Leaf): boolean => leaf.value === null)
        .map((leaf: Leaf): string => leaf.path);

      for (const path of nullPaths) {
        expect(
          LISTED_TODOS.some((todo: RegExp): boolean => todo.test(path)),
          path,
        ).toBe(true);
      }
    });

    it('lists the jobs newest first, each with valid dates', (): void => {
      const periods: Period[] = content.career.jobs.map(
        (job: Job): Period => job.period,
      );

      for (const period of periods) {
        for (const { month } of [period.start, period.end]) {
          expect(month).toBeGreaterThanOrEqual(1);
          expect(month).toBeLessThanOrEqual(12);
        }
        expect(startMonths(period)).toBeLessThanOrEqual(endMonths(period));
      }
      for (let index: number = 1; index < periods.length; index += 1) {
        const newer: Period | undefined = periods[index - 1];
        const older: Period | undefined = periods[index];
        if (newer !== undefined && older !== undefined) {
          expect(startMonths(newer)).toBeGreaterThanOrEqual(startMonths(older));
        }
      }
    });

    it('lists every tool once', (): void => {
      const names: string[] = content.stack.groups.flatMap(
        (group: ToolGroup): string[] =>
          group.tools.map((tool: Tool): string => tool.name),
      );

      expect(new Set<string>(names).size).toBe(names.length);
    });

    it('flips the hero role through at most two titles, so it ends within 5 s (WCAG 2.2.2)', (): void => {
      expect(content.profile.roleFlips.length).toBeLessThanOrEqual(2);
    });

    it('shows at most three testimonials (brief 4.6)', (): void => {
      expect(content.team.quotes.length).toBeLessThanOrEqual(3);
    });

    it('starts the brand’s accessible name with its visible text (WCAG 2.5.3)', (): void => {
      const visibleText: string = `${content.profile.initials} ${content.brand.text}`;

      expect(
        content.brand.accessibleName(
          content.profile.initials,
          content.brand.text,
        ),
      ).toMatch(new RegExp(`^${visibleText}`));
    });
  },
);

describe('English content', (): void => {
  it('writes plurals and numbered labels from their templates', (): void => {
    expect(en.stack.toolCount(1)).toBe('1 tool');
    expect(en.stack.toolCount(3)).toBe('3 tools');
    expect(en.projects.spotLabel('01')).toBe('Spot 01');
  });

  it('builds the meta description from the tagline and the availability (brief 9)', (): void => {
    expect(en.seo.home.description).toContain(en.profile.tagline);
    expect(en.seo.home.description).toContain(en.profile.availability);
  });

  it('keeps the email address in parts, so it is joined only at runtime', (): void => {
    const leaves: readonly Leaf[] = collectLeaves(en);
    const address: string = `${en.profile.email.user}@${en.profile.email.domain}`;

    for (const { value } of leaves) {
      expect(value).not.toBe(address);
    }
  });
});

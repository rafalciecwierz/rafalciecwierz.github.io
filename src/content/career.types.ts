import type { NumberedSectionHeading } from './shared.types';

export type YearMonth = {
  year: number;
  // 1–12
  month: number;
};

export type Period = {
  start: YearMonth;
  end: YearMonth;
};

export type YearSpan = {
  start: number;
  end: number;
};

export type Job = {
  id: string;
  company: string;
  // The short name painted on the company's building in the career run.
  sign: string;
  // More than one role means a promotion, shown as "first → second".
  roles: readonly [string, ...string[]];
  period: Period;
  points: readonly string[];
  stack: readonly string[];
};

export type Education = {
  school: string;
  degree: string;
  years: YearSpan;
};

export type Career = {
  heading: NumberedSectionHeading;
  intro: string;
  skipRun: string;
  promoted: string;
  stackLabel: string;
  // The name of each move in the run, oldest first, ending with the unbuilt roof.
  moveNames: readonly string[];
  next: {
    sign: string;
    company: string;
    role: string;
    text: string;
    cta: string;
  };
  // Newest first, as the list shows them.
  jobs: readonly Job[];
  educationLabel: string;
  // "Engineer's degree in Computer Science, 2015–2021"
  educationDetail: (degree: string, years: string) => string;
  education: Education;
};

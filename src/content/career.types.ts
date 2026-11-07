import type { NumberedSectionHeading } from './shared.types';

export type YearMonth = {
  year: number;
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
  sign: string;
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
  moveNames: readonly string[];
  next: {
    sign: string;
    company: string;
    role: string;
    text: string;
    cta: string;
  };
  jobs: readonly Job[];
  educationLabel: string;
  educationDetail: (degree: string, years: string) => string;
  education: Education;
};

import type { Stack } from '../stack.types';

// Brief 5.2. The AI group is Rafał's (28.10.2026); every item is backed by this repository or
// Ashen Contracts. It comes first so that it leads the Medium board.
export const stack: Stack = {
  heading: { number: '02', kicker: 'Kit', title: 'Stack' },
  intro:
    'Everything here has been used in production. The board says how much.',
  levels: {
    strong: { label: 'Strong', description: 'Strong production experience' },
    medium: { label: 'Medium', description: 'Medium production experience' },
    low: { label: 'Low', description: 'Low production experience' },
  },
  toolCount: (count: number): string =>
    `${String(count)} ${count === 1 ? 'tool' : 'tools'}`,
  groupLabel: (group: string, level: string): string =>
    `${group}, ${level.toLowerCase()}`,
  ai: {
    title: 'AI in the loop',
    text: 'Every tool on these boards I now use with AI agents alongside me: from specs and code to tests and reviews. I set the direction and check the output.',
    // The arrow is an icon next to the link, hidden from screen readers.
    link: 'How I work with AI',
  },
  groups: [
    {
      id: 'ai',
      name: 'AI',
      isHighlighted: true,
      tools: [
        { name: 'Claude Code', level: 'medium' },
        { name: 'Agent skills', level: 'medium' },
        { name: 'Subagents', level: 'medium' },
        { name: 'MCP servers', level: 'medium' },
        { name: 'Claude Code hooks', level: 'medium' },
        { name: 'AI code review in CI', level: 'medium' },
        { name: 'Context engineering', level: 'medium' },
        { name: 'Spec-driven development', level: 'medium' },
        { name: 'Agent guardrails', level: 'medium' },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend',
      isHighlighted: false,
      tools: [
        { name: 'React', level: 'strong' },
        { name: 'TypeScript', level: 'strong' },
        { name: 'JavaScript', level: 'strong' },
        { name: 'HTML5', level: 'strong' },
        { name: 'CSS / SCSS / Styled-components', level: 'strong' },
        { name: 'Next.js', level: 'medium' },
        { name: 'Gatsby', level: 'medium' },
        { name: 'Module Federation', level: 'medium' },
        { name: 'React Native', level: 'low' },
      ],
    },
    {
      id: 'dataAndUi',
      name: 'Data & UI',
      isHighlighted: false,
      tools: [
        { name: 'TanStack Query', level: 'strong' },
        { name: 'Redux', level: 'strong' },
        { name: 'Zod', level: 'strong' },
        { name: 'React Hook Form', level: 'strong' },
        { name: 'Storybook', level: 'strong' },
        { name: 'Ant Design', level: 'strong' },
        { name: 'Material UI', level: 'strong' },
        { name: 'Tailwind CSS', level: 'medium' },
        { name: 'WebSockets', level: 'medium' },
      ],
    },
    {
      id: 'testing',
      name: 'Testing',
      isHighlighted: false,
      tools: [
        { name: 'Jest / Vitest', level: 'strong' },
        { name: 'React Testing Library', level: 'strong' },
        { name: 'Cypress', level: 'strong' },
      ],
    },
    {
      id: 'backend',
      name: 'Backend',
      isHighlighted: false,
      tools: [
        { name: 'Node.js', level: 'medium' },
        { name: 'NestJS', level: 'medium' },
        { name: 'PostgreSQL', level: 'medium' },
        { name: 'Strapi', level: 'medium' },
      ],
    },
    {
      id: 'tooling',
      name: 'Tooling',
      isHighlighted: false,
      tools: [
        { name: 'Git', level: 'strong' },
        { name: 'Figma', level: 'strong' },
        { name: 'Postman', level: 'strong' },
        { name: 'Vite', level: 'strong' },
        { name: 'Webpack', level: 'strong' },
        { name: 'Docker', level: 'medium' },
      ],
    },
  ],
};

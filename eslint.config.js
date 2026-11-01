// One ESLint config for the whole project. Each block below enforces a rule from
// docs/ARCHITECTURE.md section 15; the comments name the rule it enforces.
import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const TYPESCRIPT_FILES = ['**/*.{ts,tsx}'];
const SOURCE_FILES = ['src/**/*.{ts,tsx}', 'scripts/**/*.ts'];
const TYPE_FILES = ['**/*.types.ts', '**/*.d.ts'];
const TEST_FILES = ['**/*.test.{ts,tsx}', 'src/test/**'];

// `no-restricted-syntax` replaces its options in every block that sets it, so each block below
// lists all the selectors it needs, built from these groups.

// Principle 4: every variable with a plain name and every parameter has a written type.
// TypeScript does not allow a type on the variable of a for...of loop, so that one is skipped.
// An `as const` value is skipped too: its literal type is already written out, and section 5
// derives a union from it (`type StackLevel = (typeof STACK_LEVELS)[number]`).
const EXPLICIT_TYPES = [
  {
    selector:
      'VariableDeclaration:not(ForOfStatement > .left, ForInStatement > .left) > VariableDeclarator[id.type="Identifier"]:not([id.typeAnnotation]):not([init.type="TSAsExpression"][init.typeAnnotation.typeName.name="const"])',
    message: 'Write the type of every variable: `const label: string = …`.',
  },
  {
    selector: ':function > Identifier.params:not([typeAnnotation])',
    message: 'Write the type of every parameter, callbacks included.',
  },
  {
    selector:
      ':function > :matches(ObjectPattern, ArrayPattern).params:not([typeAnnotation])',
    message: 'Write the type of every destructured parameter.',
  },
  // A destructured hook result cannot be annotated name by name, so the hook's generic is the
  // explicit type: `const [isOpen, setIsOpen] = useState<boolean>(false)`.
  {
    selector:
      'CallExpression[callee.name=/^(useState|useRef|useReducer|createContext)$/]:not([typeArguments])',
    message: 'Write the hook’s type argument: `useState<boolean>(false)`.',
  },
];

// Section 6: one named export per component, so imports and file names always match.
const NAMED_EXPORTS_ONLY = [
  {
    selector: 'ExportDefaultDeclaration',
    message: 'Use a named export.',
  },
];

// Principle 5: types live in `.types.ts` files only.
const TYPES_IN_TYPE_FILES = [
  {
    selector: 'TSTypeAliasDeclaration, TSInterfaceDeclaration',
    message: 'Declare types in the folder’s `.types.ts` file.',
  },
];

// Principle 7: user-facing copy comes from the content layer.
const NO_HARD_CODED_COPY = [
  {
    selector: 'JSXText[value=/\\S/]',
    message: 'Copy comes from the content layer, not from JSX text.',
  },
  {
    selector:
      'JSXAttribute[name.name=/^(aria-label|aria-description|alt|title|placeholder)$/] > Literal',
    message: 'Labels and alt text come from the content layer.',
  },
];

// Principle 3: pages and sections only compose components; HTML tags live in src/components/.
const NO_HTML_TAGS = [
  {
    selector:
      'JSXOpeningElement[name.type="JSXIdentifier"][name.name=/^[a-z]/]',
    message:
      'Pages and sections compose components only. Wrap the HTML tag in a component.',
  },
];

// Section 3: the import direction, and lazy motion components that stay lazy.
const LAZY_MOTION = {
  group: ['@/motionComponents', '@/motionComponents/*'],
  message:
    'Motion components are loaded only with import() through MotionLayer (section 13).',
};
// Section 13: GSAP and Lenis stay in the lazy motion chunks. Code that reaches the initial
// bundle never imports them, and motion components take GSAP from src/motion/gsap.ts, where
// its plugins are registered (section 9).
// A regex, not a `group`: group patterns match like .gitignore, so 'lenis' would also match
// '@/motion/lenis'.
const MOTION_CORE = {
  regex: '^(gsap|@gsap/react|lenis|@/motion/(gsap|lenis))(/.*)?$',
  message:
    'GSAP and Lenis are loaded lazily: only src/motion/ and src/motionComponents/ import them (section 13).',
};
const GSAP_THROUGH_MOTION = {
  regex: '^(gsap|@gsap/react|lenis)(/.*)?$',
  allowTypeImports: true,
  message:
    'Import GSAP from @/motion/gsap, where its plugins are registered (section 9).',
};
const CONTENT_DATA = {
  group: ['@/content', '@/content/*'],
  allowTypeImports: true,
  message:
    'Only pages import content data; pass it down as props (principle 10).',
};
const UPWARD_IMPORTS = {
  group: ['@/app', '@/app/*', '@/pages', '@/pages/*'],
  message:
    'Imports go one way: app → pages → sections → components → hooks, services, utils.',
};
const SECTION_IMPORTS = {
  group: ['@/sections', '@/sections/*'],
  message:
    'Imports go one way: app → pages → sections → components → hooks, services, utils.',
};
const COMPONENT_IMPORTS = {
  group: ['@/components', '@/components/*'],
  message:
    'Imports go one way: app → pages → sections → components → hooks, services, utils.',
};
const OUT_OF_FOLDER_RELATIVE = {
  group: ['../../*', '../*/*'],
  message:
    'Import code outside this folder through its index.ts with the @/ alias.',
};

function restrictImports(...patterns) {
  return ['error', { patterns }];
}

export default defineConfig([
  globalIgnores([
    'dist/',
    'dist-server/',
    'design/',
    '.audit/',
    '.lighthouseci/',
    'node_modules/',
  ]),

  js.configs.recommended,

  // Plain JavaScript files: this config, commitlint and the agent hook. They run in Node.
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: { process: 'readonly', console: 'readonly' },
    },
  },

  {
    files: TYPESCRIPT_FILES,
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      // Section 5: return types everywhere, callbacks included.
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: false,
          allowHigherOrderFunctions: false,
          allowIIFEs: false,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      // Principle 4 asks for the annotations this rule would remove.
      '@typescript-eslint/no-inferrable-types': 'off',
      // Section 5: one way to write object types; no casts except `as const`.
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      // It would suggest `!` instead of a cast, and both are banned.
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      // Principle 7: no magic numbers. A constant declaration or a data table names the value.
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
        },
      ],
      // Section 4: names.
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'] },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        // PascalCase for components, UPPER_CASE for module-level constants.
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'should', 'can'],
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        {
          selector: 'parameter',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'should', 'can'],
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        // Keys such as CSS class names, HTML attributes or 'ROUTE_PATHS' follow their own rules.
        { selector: ['objectLiteralProperty', 'typeProperty'], format: null },
        {
          selector: 'typeProperty',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'should', 'can'],
        },
      ],
      // Principle 13: small files.
      'max-lines': [
        'error',
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      // Section 6: functions are declarations: `function Button(): ReactElement`.
      'func-style': ['error', 'declaration'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // Source code and scripts: the project's own conventions.
  {
    files: SOURCE_FILES,
    rules: {
      'no-restricted-syntax': [
        'error',
        ...EXPLICIT_TYPES,
        ...NAMED_EXPORTS_ONLY,
        ...TYPES_IN_TYPE_FILES,
        ...NO_HARD_CODED_COPY,
      ],
    },
  },
  {
    files: TYPE_FILES,
    rules: {
      'no-restricted-syntax': [
        'error',
        ...EXPLICIT_TYPES,
        ...NAMED_EXPORTS_ONLY,
      ],
    },
  },
  {
    files: ['src/pages/**/*.tsx', 'src/sections/**/*.tsx'],
    ignores: TEST_FILES,
    rules: {
      'no-restricted-syntax': [
        'error',
        ...EXPLICIT_TYPES,
        ...NAMED_EXPORTS_ONLY,
        ...TYPES_IN_TYPE_FILES,
        ...NO_HARD_CODED_COPY,
        ...NO_HTML_TAGS,
      ],
    },
  },

  // React: hooks and accessibility.
  {
    files: ['src/**/*.tsx'],
    extends: [reactHooks.configs.flat.recommended, jsxA11y.flatConfigs.strict],
  },

  // Section 3: the import direction, per folder.
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': restrictImports(
        LAZY_MOTION,
        OUT_OF_FOLDER_RELATIVE,
        MOTION_CORE,
      ),
    },
  },
  {
    files: ['src/sections/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': restrictImports(
        LAZY_MOTION,
        OUT_OF_FOLDER_RELATIVE,
        MOTION_CORE,
        CONTENT_DATA,
        UPWARD_IMPORTS,
      ),
    },
  },
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': restrictImports(
        LAZY_MOTION,
        OUT_OF_FOLDER_RELATIVE,
        MOTION_CORE,
        CONTENT_DATA,
        UPWARD_IMPORTS,
        SECTION_IMPORTS,
      ),
    },
  },
  {
    files: ['src/motionComponents/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': restrictImports(
        LAZY_MOTION,
        OUT_OF_FOLDER_RELATIVE,
        GSAP_THROUGH_MOTION,
        CONTENT_DATA,
        UPWARD_IMPORTS,
        SECTION_IMPORTS,
      ),
    },
  },
  {
    files: [
      'src/{hooks,services,utils,constants}/**/*.{ts,tsx}',
      'src/motion/motionLayer/**/*.{ts,tsx}',
      'src/content/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/no-restricted-imports': restrictImports(
        LAZY_MOTION,
        OUT_OF_FOLDER_RELATIVE,
        MOTION_CORE,
        UPWARD_IMPORTS,
        SECTION_IMPORTS,
        COMPONENT_IMPORTS,
      ),
    },
  },
  // src/motion/ itself (gsap.ts, lenis.ts) is where GSAP and Lenis are imported.
  {
    files: ['src/motion/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': restrictImports(
        LAZY_MOTION,
        OUT_OF_FOLDER_RELATIVE,
        UPWARD_IMPORTS,
        SECTION_IMPORTS,
        COMPONENT_IMPORTS,
      ),
    },
  },

  // Numbers are named in `.constants.ts` files, data tables included (the rig's poses, for
  // example), and tests check concrete values; literal numbers are allowed in both.
  {
    files: ['**/*.constants.ts', ...TEST_FILES],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },

  // Config files that tools load by their default export.
  {
    files: ['vite.config.ts'],
    rules: {
      'no-restricted-syntax': ['error', ...EXPLICIT_TYPES],
    },
  },

  // Formatting is Prettier's job: switch off the stylistic rules that conflict with it.
  prettier,
]);

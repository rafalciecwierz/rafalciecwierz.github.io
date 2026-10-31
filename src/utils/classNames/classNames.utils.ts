import type { ClassName } from './classNames.types';

function isClassName(name: ClassName): name is string {
  return typeof name === 'string' && name !== '';
}

// Joins the class names that are set: classNames(styles.button, isActive && styles.active).
// A few lines of our own instead of the clsx package (docs/ARCHITECTURE.md section 12).
export function classNames(...names: readonly ClassName[]): string {
  return names.filter(isClassName).join(' ');
}

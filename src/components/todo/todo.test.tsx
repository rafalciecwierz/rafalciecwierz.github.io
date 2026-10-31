import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Todo } from './todo.component';
import { TODO_MARKER } from './todo.constants';

const MISSING: string = 'Rafał to provide URL';

describe('Todo', (): void => {
  it('marks the missing content and says what is missing', (): void => {
    render(<Todo>{MISSING}</Todo>);

    expect(screen.getByText(TODO_MARKER)).toBeInTheDocument();
    expect(screen.getByText(MISSING)).toBeInTheDocument();
  });
});

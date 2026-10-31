import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button.component';

const LABEL: string = 'Menu';

describe('Button', (): void => {
  it('is always type="button", so it never submits a form', (): void => {
    render(<Button>{LABEL}</Button>);

    expect(screen.getByRole('button', { name: LABEL })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('passes its ARIA attributes and click handler through', async (): Promise<void> => {
    const handleClick: () => void = vi.fn<() => void>();
    render(
      <Button
        aria-expanded={false}
        aria-controls="nav"
        onClick={handleClick}
        icon="arrowRight"
      >
        {LABEL}
      </Button>,
    );

    const button: HTMLElement = screen.getByRole('button', { name: LABEL });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'nav');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});

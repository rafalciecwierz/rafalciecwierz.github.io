import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading } from './heading.component';

const TITLE: string = 'Ashen Contracts';

describe('Heading', (): void => {
  it('renders the level it is given, whatever its size', (): void => {
    render(
      <Heading level={3} size="lg" id="spot">
        {TITLE}
      </Heading>,
    );

    expect(
      screen.getByRole('heading', { level: 3, name: TITLE }),
    ).toHaveAttribute('id', 'spot');
  });
});

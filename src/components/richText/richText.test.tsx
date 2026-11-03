import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RichText } from './richText.component';

describe('RichText', (): void => {
  it('shows plain text as it is', (): void => {
    const { container } = render(<RichText text="Just words." />);

    expect(container.textContent).toBe('Just words.');
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('turns the linked parts into links inside the text', (): void => {
    const { container } = render(
      <RichText
        text={[
          'I train with ',
          { text: 'my crew', linkUrl: 'https://example.com/' },
          '.',
        ]}
      />,
    );

    expect(container.textContent).toBe('I train with my crew.');
    expect(screen.getByRole('link', { name: 'my crew' })).toHaveAttribute(
      'href',
      'https://example.com/',
    );
  });
});

import { describe, expect, it } from 'vitest';

import { joinEmail } from './email.utils';

describe('joinEmail', (): void => {
  it('joins the user and the domain', (): void => {
    expect(joinEmail({ user: 'name', domain: 'example.com' })).toBe(
      'name@example.com',
    );
  });
});

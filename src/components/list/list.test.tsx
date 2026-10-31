import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';

import { ListItem } from '@/components/listItem';

import { List } from './list.component';

const ITEMS: readonly string[] = ['Email', 'GitHub'];

describe('List', (): void => {
  it('is an unordered list by default, with its items', (): void => {
    render(
      <List label="Channels">
        {ITEMS.map((item: string): ReactElement => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </List>,
    );

    const list: HTMLElement = screen.getByRole('list', { name: 'Channels' });
    expect(list.tagName).toBe('UL');
    expect(screen.getAllByRole('listitem')).toHaveLength(ITEMS.length);
  });

  it('is an ordered list when the order means something', (): void => {
    render(
      <List kind="ordered">
        <ListItem>{ITEMS[0]}</ListItem>
      </List>,
    );

    expect(screen.getByRole('list').tagName).toBe('OL');
  });
});

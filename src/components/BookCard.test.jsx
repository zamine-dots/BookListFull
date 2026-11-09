import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import BookCard from './BookCard';
import { useAuth } from '../utils/auth-context';

vi.mock('../utils/auth-context', () => ({ useAuth: vi.fn() }));

test('an existing favorite can be removed without changing its author', async () => {
  const addfavbook = vi.fn().mockResolvedValue(true);
  vi.mocked(useAuth).mockReturnValue({ addfavbook });
  render(<BookCard bok={{ bookTitle: 'A book', bookAuther: 'An author', coverUrl: 'https://example.com/cover.jpg' }} />);
  expect(addfavbook).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Remove from favorites' }));
  await waitFor(() => expect(addfavbook).toHaveBeenCalledWith({
    coverUrl: 'https://example.com/cover.jpg', title: 'A book', author: 'An author',
  }, false));
  expect(await screen.findByRole('button', { name: 'Add to favorites' })).toHaveAttribute('aria-pressed', 'false');
});

test('a failed save keeps the current favorite state and shows an error', async () => {
  vi.mocked(useAuth).mockReturnValue({ addfavbook: vi.fn().mockResolvedValue(false) });
  render(<BookCard bok={{ title: 'No cover book', author_name: ['An author'] }} />);
  fireEvent.click(screen.getByRole('button', { name: 'Add to favorites' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not update favorites');
  expect(screen.getByRole('button', { name: 'Add to favorites' })).toHaveAttribute('aria-pressed', 'false');
});

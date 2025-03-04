import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const setup = (InitialPath = '/') => {
  let history;
  render(
    <MemoryRouter initialEntries={[InitialPath]}>
      <App />
      <Route
        path="*"
        render={(props) => {
          history = props.history;
          return null;
        }}
      />
    </MemoryRouter>,
  );
  return { history };
};

test('navigates to search page when button is clicked', () => {
  setup();
  const buttonLink = screen.getByRole('link', { name: /SHOW ME THE BEST TIME/i });
  userEvent.click(buttonLink);
  expect(screen.getByText(/Find the best time for a subreddit/i)).toBeInTheDocument();
});

test('navigates to search page when img is clicked', () => {
  setup();
  const imgLink = screen.getByRole('link', { name: /table/i });
  userEvent.click(imgLink);
  expect(screen.getByText(/Find the best time for a subreddit/i)).toBeInTheDocument();
});

test('navigates to profy.dev when more info is clicked', () => {
  setup();
  const article = screen.getAllByRole('article')[1];
  let profyLink = within(article).getByRole('link', { name: /profy.dev/i });
  expect(profyLink).toHaveAttribute('href', 'https://profy.dev');

  profyLink = within(article).getByRole('link', { name: /Click here/i });
  expect(profyLink).toHaveAttribute('href', 'https://profy.dev/employers');
});

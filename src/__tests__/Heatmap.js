import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import App from '../App';
import server from '../setupTests';

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

test('heatmap gets displayed when input is submitted', async () => {
  setup('/search/javascript');
  const input = screen.getByRole('textbox');
  userEvent.clear(input);
  userEvent.type(input, 'react');
  const button = screen.getByRole('button', { name: /search/i });
  await act(async () => {
    userEvent.click(button);
  });
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/heatmap/i)).toBeInTheDocument();
  });
  expect(screen.getAllByText(/5/i)[0]).toBeInTheDocument();
});

test('error state gets displayed when request failed', async () => {
  server.use(
    rest.get(
      'https://www.reddit.com/r/react/top.json',
      (req, res, ctx) => res(ctx.status(404)),
    ),
  );

  setup('/search/javascript');
  const input = screen.getByRole('textbox');
  userEvent.clear(input);
  userEvent.type(input, 'react');
  const button = screen.getByRole('button', { name: /search/i });
  await act(async () => {
    userEvent.click(button);
  });
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/Some Error occured/i)).toBeInTheDocument();
  });
});

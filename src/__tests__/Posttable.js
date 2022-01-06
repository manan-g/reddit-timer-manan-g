import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
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

test('table gets displayed when a non-zero cell is clicked', async () => {
  await act(async () => {
    setup('/search/javascript');
  });

  let cell;
  await waitFor(() => {
    cell = screen.getAllByText(/3/i)[0];
  });

  expect(cell).toBeInTheDocument();
  userEvent.click(cell);
  await waitFor(() => {
    expect(screen.getByText(/posts/i)).toBeInTheDocument();
  });

  // 3 posts have their link
  expect(
    screen.getByRole('link', {
      name: /V8 7.6 Release: "In V8 v7.6, we’ve overhauled our JSON parse.../i,
    }),
  ).toHaveAttribute(
    'href',
    'https://www.reddit.com/r/javascript/comments/c75b5v/v8_76_release_in_v8_v76_weve_overhauled_our_json/',
  );
  expect(
    screen.getByRole('link', {
      name: /Bouncing balls simulation using plain JavaScript (demo link .../i,
    }),
  ).toHaveAttribute(
    'href',
    'https://www.reddit.com/r/javascript/comments/f0znep/bouncing_balls_simulation_using_plain_javascript/',
  );
  expect(
    screen.getByRole('link', {
      name: /V[AskJS] How are you deploying your front-end + node apps?/i,
    }),
  ).toHaveAttribute(
    'href',
    'https://www.reddit.com/r/javascript/comments/egxt0v/askjs_how_are_you_deploying_your_frontend_node/',
  );

  // author link
  expect(screen.getByRole('link', { name: /mtrajk93/i })).toHaveAttribute(
    'href',
    'https://www.reddit.com/user/mtrajk93',
  );
});

test('nothing gets displayed when zero cell is clicked', async () => {
  await act(async () => {
    setup('/search/javascript');
  });

  let cell;
  await waitFor(() => {
    cell = screen.getAllByText(/0/i)[0];
  });

  expect(cell).toBeInTheDocument();
  userEvent.click(cell);
  expect(screen.queryByText(/posts/i)).toBeNull();
});

test('no link when [deleted] is present', async () => {
  await act(async () => {
    setup('/search/javascript');
  });

  let cell;
  await waitFor(() => {
    cell = screen.getAllByText(/4/i)[2];
  });

  expect(cell).toBeInTheDocument();
  userEvent.click(cell);
  await waitFor(() => {
    expect(screen.getByText(/posts/i)).toBeInTheDocument();
  });
  // 3 posts have their link
  expect(
    screen.getByRole('link', {
      name: /[deleted]/i,
    }),
  ).not.toHaveAttribute(
    'href',
  );
});

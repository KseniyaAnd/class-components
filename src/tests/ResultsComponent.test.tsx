import React from 'react';
import { render } from '@testing-library/react';
import ResultsComponent from '../components/resultsComponent/ResultsComponent';

test('renders correct number of cards', () => {
  const results = [{ name: 'Luke Skywalker', description: '...' }, { name: 'Darth Vader', description: '...' }];
  const { getAllByRole } = render(<ResultsComponent results={results} />);
  const cards = getAllByRole('article');
  expect(cards.length).toBe(2);
});

test('displays message if no cards are present', () => {
  const results: any[] = [];
  const { getByText } = render(<ResultsComponent results={results} />);
  const messageElement = getByText(/No cards found/i);
  expect(messageElement).toBeInTheDocument();
});

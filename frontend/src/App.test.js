import { render, screen } from '@testing-library/react';
import Paths from './Paths';

test('renders learn react link', () => {
  render(<Paths />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

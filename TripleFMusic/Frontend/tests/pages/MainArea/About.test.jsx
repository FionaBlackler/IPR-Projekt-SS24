import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from "../../../src/pages/MainArea/About";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('About Component', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  };

  test('renders About component correctly', () => {
    renderComponent();
    expect(screen.getByText(/About us!/i)).toBeInTheDocument();
    expect(screen.getByText(/Our vision and goal/i)).toBeInTheDocument();
    expect(screen.getByText(/Our team/i)).toBeInTheDocument();
    expect(screen.getByText(/Our motivation/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  test('navigates when icons are clicked', () => {
    const { getByAltText } = renderComponent();

    fireEvent.click(getByAltText(/About/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/about');

    fireEvent.click(getByAltText(/Home/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/home');

    fireEvent.click(getByAltText(/Music Gallery/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/musicgallery');

    fireEvent.click(getByAltText(/Upload new song/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/addsong');

    fireEvent.click(getByAltText(/Internet Explorer/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/internet');
  });

  test('toggles tooltip text', () => {
    renderComponent();
    const button = screen.getByText(/Matze/i);
    fireEvent.click(button);
    expect(screen.getByText(/Lets tackle this module like its a piñata/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText(/Lets tackle this module like its a piñata/i)).not.toBeInTheDocument();
  });

  test('closes About window and navigates to home', () => {
    renderComponent();
    const closeButton = screen.getByRole('button', { name: '' }); // Assuming the close button has no accessible name
    fireEvent.click(closeButton);
    expect(navigate).toHaveBeenCalledWith('/welcome/home');
  });

  test('matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

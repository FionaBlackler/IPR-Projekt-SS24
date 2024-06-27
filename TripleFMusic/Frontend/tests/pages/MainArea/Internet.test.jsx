import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Internet from '../../../src/pages/MainArea/Internet';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Internet Component', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const renderComponent = () => render(<Internet />);

  test('renders Internet component correctly', () => {
    renderComponent();
    expect(screen.getByText(/Microsoft Internet Explorer - \[No Document\]/i)).toBeInTheDocument();
    expect(screen.getByText(/Unfortunately no internet connection could be established./i)).toBeInTheDocument();
  });

  test('navigates when icons are clicked', () => {
    const { getByAltText } = renderComponent();

    fireEvent.click(getByAltText(/About/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/about');

    fireEvent.click(getByAltText(/Home/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/home');

    fireEvent.click(getByAltText(/Music Gallery/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/musicgallery');

    fireEvent.click(getByAltText(/addsong/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/addsong');

    fireEvent.click(getByAltText(/internetexplorer/i));
    expect(navigate).toHaveBeenCalledWith('/welcome/internet');
  });

  test('closes Internet window and navigates to home', () => {
    renderComponent();
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    expect(navigate).toHaveBeenCalledWith('/welcome/home');
  });

  test('opens and closes SnakeGame modal', () => {
    renderComponent();
    const openButton = screen.getByText(/Snake me up!/i);
    fireEvent.click(openButton);
    expect(screen.getByText(/Play with Snaki/i)).toBeInTheDocument();

    const closeModalButton = screen.getAllByRole('button', { name: '' }).filter(btn => btn.closest('.game-modal-window')).pop();
    fireEvent.click(closeModalButton);
    expect(screen.queryByText(/Play with Snaki/i)).not.toBeInTheDocument();
  });

  test('shows alert when retry button is clicked', () => {
    renderComponent();
    global.alert = jest.fn();
    const retryButton = screen.getByText('↻');
    fireEvent.click(retryButton);
    expect(global.alert).toHaveBeenCalledWith('still no connection...');
  });

  test('plays SnakeGame correctly', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Snake me up!/i));

    // Capture the initial position of the snake
    const initialSegment = screen.getAllByTestId('snake-segment')[0];
    const initialLeft = parseInt(initialSegment.style.left);
    const initialTop = parseInt(initialSegment.style.top);

    // Move the snake to the right
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Capture the new position of the snake
    const movedSegmentRight = screen.getAllByTestId('snake-segment')[0];
    const movedLeft = parseInt(movedSegmentRight.style.left);
    expect(movedLeft).toBe(initialLeft + 20);

    // Move the snake down
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Capture the new position of the snake after moving down
    const movedSegmentDown = screen.getAllByTestId('snake-segment')[0];
    const movedTop = parseInt(movedSegmentDown.style.top);
    expect(movedTop).toBe(initialTop + 20);

    // Simulate game over by moving the snake out of bounds
    act(() => {
      jest.advanceTimersByTime(100 * 18);
    });
    expect(screen.getByText(/Game Over!/i)).toBeInTheDocument();

    // Restart the game
    fireEvent.click(screen.getByText(/Restart/i));
    expect(screen.queryByText(/Game Over!/i)).not.toBeInTheDocument();
  });

  
  test('increases score and repositions food in SnakeGame', async () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Snake me up!/i));

    // Capture initial position of the food
    const initialFood = screen.getByTestId('food');
    const initialFoodLeft = parseInt(initialFood.style.left);
    const initialFoodTop = parseInt(initialFood.style.top);

    // Move the snake to the initial food position
    let snakeSegment = screen.getAllByTestId('snake-segment')[0];
    let snakeLeft = parseInt(snakeSegment.style.left);
    let snakeTop = parseInt(snakeSegment.style.top);

    // Move horizontally towards the food
    while (snakeLeft < initialFoodLeft) {
      fireEvent.keyDown(window, { key: 'ArrowRight' });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      snakeSegment = screen.getAllByTestId('snake-segment')[0];
      snakeLeft = parseInt(snakeSegment.style.left);
    }

    while (snakeLeft > initialFoodLeft) {
      fireEvent.keyDown(window, { key: 'ArrowLeft' });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      snakeSegment = screen.getAllByTestId('snake-segment')[0];
      snakeLeft = parseInt(snakeSegment.style.left);
    }

    // Move vertically towards the food
    while (snakeTop < initialFoodTop) {
      fireEvent.keyDown(window, { key: 'ArrowDown' });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      snakeSegment = screen.getAllByTestId('snake-segment')[0];
      snakeTop = parseInt(snakeSegment.style.top);
    }

    while (snakeTop > initialFoodTop) {
      fireEvent.keyDown(window, { key: 'ArrowUp' });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      snakeSegment = screen.getAllByTestId('snake-segment')[0];
      snakeTop = parseInt(snakeSegment.style.top);
    }

    // Allow the game to process the food eating and score update
    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    // Verify food repositioning and score update
    const scoreElement = await screen.findByTestId('score');
    const newFood = screen.getByTestId('food');
    const newFoodLeft = parseInt(newFood.style.left);
    const newFoodTop = parseInt(newFood.style.top);

    expect(scoreElement.textContent).toBe('Your score: 1');
    expect(newFoodLeft).not.toBe(initialFoodLeft);
    expect(newFoodTop).not.toBe(initialFoodTop);
  });

  test('matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

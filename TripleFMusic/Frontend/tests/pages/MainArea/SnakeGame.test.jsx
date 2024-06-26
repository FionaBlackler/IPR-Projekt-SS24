import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SnakeGame from '../../../src/pages/MainArea/SnakeGame'; // Passe den Pfad an, falls nötig

describe('SnakeGame Component', () => {
  jest.useFakeTimers();

  const renderComponent = () => render(<SnakeGame />);

  beforeEach(() => {
    jest.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.1) // Initial snake position
      .mockReturnValueOnce(0.2) // Initial food position
      .mockReturnValue(0.3); // Next food position after eating
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('renders SnakeGame component correctly', () => {
    renderComponent();

    expect(screen.getByTestId('food')).toBeInTheDocument();
    expect(screen.getAllByTestId('snake-segment').length).toBeGreaterThan(0);
  });

  test('initializes snake position correctly', () => {
    renderComponent();
    const snakeSegments = screen.getAllByTestId('snake-segment');
    expect(snakeSegments.length).toBe(1); // Initial snake length is 1
  });

  test('initializes food position correctly', () => {
    renderComponent();
    const food = screen.getByTestId('food');
    expect(food).toBeInTheDocument();
  });

  test('moves the snake when arrow keys are pressed', () => {
    renderComponent();

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const segments = screen.getAllByTestId('snake-segment');
    const head = segments[0].style;

    const initialLeft = parseInt(head.left);
    const initialTop = parseInt(head.top);

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(parseInt(head.left)).toBe(initialLeft + 20);
    expect(parseInt(head.top)).toBe(initialTop);

    fireEvent.keyDown(window, { key: 'ArrowDown' });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(parseInt(head.left)).toBe(initialLeft + 20);
    expect(parseInt(head.top)).toBe(initialTop + 20);
  });

  test('increases score and relocates food when snake eats food', () => {
    renderComponent();

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const snake = screen.getAllByTestId('snake-segment');
    const head = snake[0].style;

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Ensure the food is placed in front of the snake
    jest.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.5) // Mock initial food position
      .mockReturnValueOnce((head.left / 20 + 1) / 18) // Mock new food x position after eating
      .mockReturnValueOnce(head.top / 20 / 14); // Mock new food y position after eating

    // Simulate snake eating the food
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Check that the food has moved and score has increased
    const newFood = screen.getByTestId('food').style;
    expect(parseInt(newFood.left)).not.toBe(parseInt(head.left));
    expect(parseInt(newFood.top)).not.toBe(parseInt(head.top));
  });

  test('shows game over when snake hits wall or itself', () => {
    renderComponent();

    // Move snake to the right to hit the wall
    for (let i = 0; i < 20; i++) {
      fireEvent.keyDown(window, { key: 'ArrowRight' });
      act(() => {
        jest.advanceTimersByTime(100);
      });
    }

    expect(screen.getByText('Game Over!')).toBeInTheDocument();

    // Restart the game
    fireEvent.click(screen.getByText('Restart'));

    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
    expect(screen.getByTestId('food')).toBeInTheDocument();
    expect(screen.getAllByTestId('snake-segment').length).toBeGreaterThan(0);
  });

  test('restarts the game after Game Over', () => {
    renderComponent();

    // Move snake to the right to hit the wall
    for (let i = 0; i < 20; i++) {
      fireEvent.keyDown(window, { key: 'ArrowRight' });
      act(() => {
        jest.advanceTimersByTime(100);
      });
    }

    expect(screen.getByText('Game Over!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Restart'));

    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
    expect(screen.getByTestId('food')).toBeInTheDocument();
    expect(screen.getAllByTestId('snake-segment').length).toBeGreaterThan(0);
  });

  test('game is not over at the start', () => {
    renderComponent();
    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
  });
});

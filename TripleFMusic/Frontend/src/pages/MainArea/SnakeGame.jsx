import React, { useState, useEffect } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const cellSize = 20;
  const gridWidth = 360;
  const gridHeight = 286;

  const numCellsX = Math.floor(gridWidth / cellSize);
  const numCellsY = Math.floor(gridHeight / cellSize);

  const initialFoodPosition = () => ({
    x: Math.floor(Math.random() * numCellsX),
    y: Math.floor(Math.random() * numCellsY),
  });

  const initialSnakePosition = () => {
    const x = Math.floor(Math.random() * numCellsX);
    const y = Math.floor(Math.random() * numCellsY);
    return [{ x, y }];
  };

  const [snake, setSnake] = useState(initialSnakePosition());
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [food, setFood] = useState(initialFoodPosition());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (head.x === food.x && head.y === food.y) {
          setScore(score + 1);
          setFood(initialFoodPosition());
        } else {
          newSnake.pop();
        }

        if (
          head.x < 0 ||
          head.x >= numCellsX ||
          head.y < 0 ||
          head.y >= numCellsY ||
          newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          clearInterval(interval);
          return prevSnake;
        }

        newSnake.unshift(head);
        return newSnake;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction, food, score, gameOver]);

  const restartGame = () => {
    setSnake(initialSnakePosition());
    setDirection({ x: 0, y: 0 });
    setFood(initialFoodPosition());
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="snake-game">
      <div className="game-area" style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}>
        {snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            data-testid="snake-segment"
            style={{ left: `${segment.x * cellSize}px`, top: `${segment.y * cellSize}px` }}
          />
        ))}
        <div
          className="food"
          data-testid="food"
          style={{ left: `${food.x * cellSize}px`, top: `${food.y * cellSize}px` }}
        />
      </div>
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <p data-testid="score">Your score: {score}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
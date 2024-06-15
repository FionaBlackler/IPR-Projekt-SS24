import React, { useEffect, useRef, useState } from 'react';
import './SnakeGame.css';

const SnakeGame = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const snakeSpeed = 100; // milliseconds
  const canvasSize = 400;
  const tileSize = 20;
  const totalTiles = canvasSize / tileSize;

  const getRandomTile = () => {
    return {
      x: Math.floor(Math.random() * totalTiles) * tileSize,
      y: Math.floor(Math.random() * totalTiles) * tileSize,
    };
  };

  const [snake, setSnake] = useState([
    { x: tileSize * 2, y: 0 },
    { x: tileSize, y: 0 },
    { x: 0, y: 0 },
  ]);

  const [direction, setDirection] = useState({ x: tileSize, y: 0 });
  const [food, setFood] = useState(getRandomTile());

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -tileSize });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: tileSize });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -tileSize, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: tileSize, y: 0 });
        break;
      default:
        break;
    }
  };

  const checkCollision = (head, array) => {
    for (let i = 0; i < array.length; i++) {
      if (head.x === array[i].x && head.y === array[i].y) {
        return true;
      }
    }
    return false;
  };

  const gameLoop = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      if (
        head.x < 0 ||
        head.x >= canvasSize ||
        head.y < 0 ||
        head.y >= canvasSize ||
        checkCollision(head, newSnake)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood(getRandomTile());
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvasSize, canvasSize);

    snake.forEach((segment) => {
      context.fillStyle = 'green';
      context.fillRect(segment.x, segment.y, tileSize, tileSize);
    });

    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, tileSize, tileSize);
  }, [snake, food]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      gameLoop();
    }, snakeSpeed);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, gameOver]);

  const resetGame = () => {
    setSnake([
      { x: tileSize * 2, y: 0 },
      { x: tileSize, y: 0 },
      { x: 0, y: 0 },
    ]);
    setDirection({ x: tileSize, y: 0 });
    setFood(getRandomTile());
    setScore(0);
    setGameOver(false);
    onClose(); // Close the modal when restarting game
  };

  return (
    <div className="snake-game">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="snake-canvas"
      />
      <div className="snake-score">Score: {score}</div>
      {gameOver && (
        <div className="snake-game-over">
          <div>Game Over</div>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

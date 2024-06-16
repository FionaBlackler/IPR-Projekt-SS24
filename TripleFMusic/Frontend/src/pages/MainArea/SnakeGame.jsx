// SnakeGame.jsx

import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const SnakeGame = ({ onClose }) => {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0]
  ]);
  const [foodDot, setFoodDot] = useState([5, 5]);
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);

  const gameRef = useRef();

  useEffect(() => {
    const context = gameRef.current.getContext('2d');
    const interval = setInterval(() => {
      moveSnake();
    }, speed);

    document.onkeydown = onKeyDown;

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
    if (gameOver) {
      onClose();
    }
  }, [snakeDots]);

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection('UP');
        break;
      case 40:
        setDirection('DOWN');
        break;
      case 37:
        setDirection('LEFT');
        break;
      case 39:
        setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }

    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  };

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOverFunction();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOverFunction();
      }
    });
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === foodDot[0] && head[1] === foodDot[1]) {
      setFoodDot([
        Math.floor(Math.random() * 50) * 2,
        Math.floor(Math.random() * 50) * 2
      ]);
      enlargeSnake();
      increaseSpeed();
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  };

  const gameOverFunction = () => {
    setGameOver(true);
  };

  return (
    <div className="snake-game">
      <canvas
        ref={gameRef}
        width="100%"
        height="100%"
        className="game-area"
      />
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

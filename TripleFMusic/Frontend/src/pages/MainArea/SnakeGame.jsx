// SnakeGame.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react95';

const SnakeGame = ({ closeModal }) => {
  const canvasRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const grid = 15;
  const canvasSize = 300;

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const resetGame = () => {
    snake = { x: 150, y: 150, dx: grid, dy: 0, cells: [], maxCells: 4 };
    apple = { x: getRandomInt(0, 19) * grid, y: getRandomInt(0, 19) * grid };
    setIsGameOver(false);
    setScore(0);
    requestAnimationFrame(loop);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let count = 0;
    let snake = { x: 150, y: 150, dx: grid, dy: 0, cells: [], maxCells: 4 };
    let apple = { x: getRandomInt(0, 19) * grid, y: getRandomInt(0, 19) * grid };

    const loop = () => {
      if (isGameOver) return;

      requestAnimationFrame(loop);

      if (++count < 10) return;
      count = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);

      snake.x += snake.dx;
      snake.y += snake.dy;

      if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        setIsGameOver(true);
        return;
      }

      snake.cells.unshift({ x: snake.x, y: snake.y });

      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }

      context.fillStyle = 'red';
      context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

      context.fillStyle = 'green';
      snake.cells.forEach((cell, index) => {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++;
          setScore(prevScore => prevScore + 1);
          apple.x = getRandomInt(0, 19) * grid;
          apple.y = getRandomInt(0, 19) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            setIsGameOver(true);
            return;
          }
        }
      });
    };

    document.addEventListener('keydown', (e) => {
      if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
      } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      }
    });

    requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, [isGameOver]);

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} style={{ border: '1px solid white', backgroundColor: 'black' }} />
      {isGameOver && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
          <Button onClick={resetGame}>Restart</Button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

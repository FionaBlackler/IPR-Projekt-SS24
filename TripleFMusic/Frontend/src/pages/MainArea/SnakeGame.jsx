import React, { useState, useEffect } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const cellSize = 20; // Größe jeder Zelle im Raster in Pixeln
  const gridWidth = 360;
  const gridHeight = 286;

  // Berechnung der Anzahl der Zellen basierend auf den Rasterdimensionen
  const numCellsX = Math.floor(gridWidth / cellSize);
  const numCellsY = Math.floor(gridHeight / cellSize);

  // Funktion zur Berechnung der zufälligen Anfangsposition des Apfels
  const initialFoodPosition = () => ({
    x: Math.floor(Math.random() * numCellsX),
    y: Math.floor(Math.random() * numCellsY)
  });

  // Funktion zur Berechnung der zufälligen Anfangsposition der Schlange
  const initialSnakePosition = () => {
    const x = Math.floor(Math.random() * numCellsX);
    const y = Math.floor(Math.random() * numCellsY);
    return [{ x, y }];
  };

  const [snake, setSnake] = useState(initialSnakePosition()); // Zufällige Anfangsposition der Schlange
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [food, setFood] = useState(initialFoodPosition()); // Zufällige Anfangsposition des Apfels
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

        // Überprüfen, ob die Schlange den Apfel erreicht hat
        if (head.x === food.x && head.y === food.y) {
          setScore(score + 1);
          // Neupositionierung des Apfels innerhalb der Grenzen
          setFood(initialFoodPosition());
        } else {
          newSnake.pop(); // Entfernen des letzten Segments, wenn kein Apfel gegessen wurde
        }

        // Überprüfen, ob die Schlange außerhalb der Spielfeldgrenzen ist oder sich selbst trifft
        if (
          head.x < 0 ||
          head.x >= numCellsX ||
          head.y < 0 ||
          head.y >= numCellsY ||
          newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          clearInterval(interval); // Spiel stoppen bei Spielende
          return prevSnake;
        }

        newSnake.unshift(head); // Hinzufügen des neuen Kopfsegments zur Schlange
        return newSnake;
      });
    }, 100); // Intervall für die Spielschleife

    return () => clearInterval(interval); // Aufräumen beim Entladen der Komponente
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
            style={{ left: `${segment.x * cellSize}px`, top: `${segment.y * cellSize}px` }}
          />
        ))}
        <div
          className="food"
          style={{ left: `${food.x * cellSize}px`, top: `${food.y * cellSize}px` }}
        />
      </div>
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <p>Your score: {score}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;

import React, { useEffect } from "react";
import { MazeData, Position } from "../types";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  mazeData: MazeData;
  currentRobotPosition: Position | null;
};

export const Map: React.FC<Props> = ({ canvasRef, mazeData, currentRobotPosition }) => {
  // Отрисовка лабиринта
  useEffect(() => {
    if (!canvasRef.current || mazeData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = Math.min(
      Math.floor(canvas.width / mazeData[0].length),
      Math.floor(canvas.height / mazeData.length)
    );

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка клеток лабиринта
    for (let y = 0; y < mazeData.length; y++) {
      for (let x = 0; x < mazeData[y].length; x++) {
        ctx.fillStyle = mazeData[y][x] === 1 ? "#333" : "#fff";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.strokeStyle = "#ddd";
        ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    // Отрисовка текущей позиции робота
    if (currentRobotPosition) {
      const { x, y } = currentRobotPosition;
      ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
      ctx.beginPath();
      ctx.arc(
        x * cellSize + cellSize / 2,
        y * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }, [mazeData, currentRobotPosition, canvasRef]);

  return (
    <div
      style={{
        flex: "0 0 60%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #000",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

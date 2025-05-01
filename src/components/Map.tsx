import React, { useEffect } from "react";
import { MazeData, Position } from "../types";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  mazeData: MazeData;
  currentRobotPosition: Position | null;
};

export const Map: React.FC<Props> = ({
  canvasRef,
  mazeData,
  currentRobotPosition,
}) => {
  useEffect(() => {
    if (!canvasRef.current || mazeData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Рассчитываем идеальный размер клетки без округления вниз
    const cellSizeWidth = canvas.width / mazeData[0].length;
    const cellSizeHeight = canvas.height / mazeData.length;
    const cellSize = Math.min(cellSizeWidth, cellSizeHeight);

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рассчитываем смещение для центрирования лабиринта
    const offsetX = (canvas.width - mazeData[0].length * cellSize) / 2;
    const offsetY = (canvas.height - mazeData.length * cellSize) / 2;

    // Отрисовка клеток лабиринта
    for (let y = 0; y < mazeData.length; y++) {
      for (let x = 0; x < mazeData[y].length; x++) {
        ctx.fillStyle = mazeData[y][x] === 1 ? "#333" : "#fff";
        ctx.fillRect(
          offsetX + x * cellSize,
          offsetY + y * cellSize,
          cellSize,
          cellSize
        );
        ctx.strokeStyle = "#ddd";
        ctx.strokeRect(
          offsetX + x * cellSize,
          offsetY + y * cellSize,
          cellSize,
          cellSize
        );
      }
    }

    // Отрисовка текущей позиции робота
    if (currentRobotPosition) {
      const { x, y } = currentRobotPosition;
      ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
      ctx.beginPath();
      ctx.arc(
        offsetX + x * cellSize + cellSize / 2,
        offsetY + y * cellSize + cellSize / 2,
        cellSize / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }, [mazeData, currentRobotPosition, canvasRef]);

  return (
    <div
      style={
        {
          /* ваш стиль */
        }
      }
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

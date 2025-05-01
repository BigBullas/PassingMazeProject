import { Map } from "./components/Map";
import React, { useEffect, useRef, useState } from "react";
import { MazeData, Position, RobotPath } from "./types";

const MazeComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mazeData, setMazeData] = useState<MazeData>([]);
  const [robotPath, setRobotPath] = useState<RobotPath>([]);
  const [isRobotMoving, setIsRobotMoving] = useState(false);
  const [isRobotPaused, setIsRobotPaused] = useState(false);
  const [currentRobotPosition, setCurrentRobotPosition] =
    useState<Position | null>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Инициализация мок-данных
  useEffect(() => {
    // TODO: добавить сюда запрос на получени лабиринта и отдавать его
    setMazeData([]);

    // TODO: добавить сюда запрос на получени пути и отдавать его
    setRobotPath([]);
  }, []);

  // Запуск таймера
  const startTimer = () => {
    if (timerRef.current) return;
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  // Остановка таймера
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Очистка интервалов при размонтировании
  useEffect(() => {
    return () => {
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Управление движением робота
  const startRobotMovement = () => {
    if (isRobotMoving || robotPath.length === 0) return;

    setIsRobotMoving(true);
    setIsRobotPaused(false);
    startTimer();
    let index = currentStep;

    if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);

    moveIntervalRef.current = setInterval(() => {
      if (index >= robotPath.length) {
        stopRobotMovement();
        return;
      }

      setCurrentRobotPosition(robotPath[index]);
      setCurrentStep(index);
      index++;
    }, 100);
  };

  const pauseRobotMovement = () => {
    if (!isRobotMoving) return;
    setIsRobotPaused(true);
    setIsRobotMoving(false);
    if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    stopTimer();
  };

  const resumeRobotMovement = () => {
    if (!isRobotPaused) return;
    startRobotMovement();
  };

  const stopRobotMovement = () => {
    setIsRobotMoving(false);
    setIsRobotPaused(false);
    if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = null;
    setCurrentStep(0);
    setCurrentRobotPosition(null);
    stopTimer();
  };

  const resetMaze = () => {
    stopRobotMovement();

    // TODO update from request
    setMazeData([]);

    // TODO update from request
    setRobotPath([]);

    setCurrentStep(0);
    setCurrentRobotPosition(null);
    setElapsedTime(0);
  };

  const applyChanges = () => {
    stopRobotMovement();
    // Здесь можно добавить логику применения изменений
    alert("Изменения применены");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Верхние 3 кнопки */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button style={buttonStyle}>Мивар</button>
        <button style={buttonStyle}>A*</button>
        <button style={buttonStyle}>Lazy Theta*</button>
      </div>

      {/* Основной контент */}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "20px",
          overflow: "hidden",
        }}
      >
        <Map
          canvasRef={canvasRef}
          mazeData={mazeData}
          currentRobotPosition={currentRobotPosition}
        />

        {/* Блок управления (40% ширины со скроллом) */}
        <div
          style={{
            flex: "0 0 40%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
            gap: "15px",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0" }}>Управление</h2>

          {/* Основные кнопки управления */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <button
              onClick={startRobotMovement}
              disabled={isRobotMoving}
              style={buttonStyle}
            >
              Запустить
            </button>
            <button
              onClick={pauseRobotMovement}
              disabled={!isRobotMoving}
              style={buttonStyle}
            >
              Остановить
            </button>
            <button
              onClick={resumeRobotMovement}
              disabled={!isRobotPaused}
              style={buttonStyle}
            >
              Продолжить
            </button>
            <button onClick={applyChanges} style={buttonStyle}>
              Применить изменения
            </button>
            <button onClick={resetMaze} style={buttonStyle}>
              Сбросить изменения
            </button>
          </div>

          {/* Таймер */}
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            <h3>Время: {elapsedTime} сек</h3>
            <button
              onClick={() => {
                stopTimer();
                setElapsedTime(0);
              }}
              style={smallButtonStyle}
            >
              Сбросить таймер
            </button>
          </div>

          {/* Дополнительные кнопки */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <h3>Дополнительные функции</h3>
            <button style={buttonStyle}>Выбор стартовой точки</button>
            <button style={buttonStyle}>Выбор конечных точек</button>
            <button style={buttonStyle}>Выбор лабиринта</button>
            <button onClick={startTimer} style={buttonStyle}>
              Засечь время
            </button>
          </div>

          {/* Информация о состоянии */}
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            <h3>Статус:</h3>
            <p>
              Робот:{" "}
              {isRobotMoving
                ? "движется"
                : isRobotPaused
                ? "на паузе"
                : "остановлен"}
            </p>
            <p>
              Текущая позиция:{" "}
              {currentRobotPosition
                ? `(${currentRobotPosition.x}, ${currentRobotPosition.y})`
                : "не определена"}
            </p>
            <p>
              Шаг: {currentStep} из {robotPath.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Стили для кнопок
const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  flex: "1 1 auto",
  minWidth: "120px",
};

const smallButtonStyle = {
  ...buttonStyle,
  padding: "5px 10px",
  fontSize: "12px",
  backgroundColor: "#2196F3",
};

export default MazeComponent;

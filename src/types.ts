// Типы для данных лабиринта
export type CellType = 0 | 1;
export type MazeData = CellType[][];
export type Position = { x: number; y: number };
export type RobotPath = Position[];
// Типы для данных лабиринта
export type CellType = 'wall' | 'path';
export type MazeData = CellType[][];
export type Position = { x: number; y: number };
export type RobotPath = Position[];
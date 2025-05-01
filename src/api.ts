import { MazeData } from "./types";

const backendUrl = process.env.REACT_APP_ALGO_BACKEND;

export const fetchMapData = async (
  id: number
): Promise<{
  data: MazeData;
  error?: string;
}> => {
  try {
    const response = await fetch(
      `http://${backendUrl}/api/v1/get_map?labirint_id=${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MazeData = await response.json();

    return {
      data,
    };
  } catch (err) {
    return {
      data: [],
      error: String(err),
    };
  }
};

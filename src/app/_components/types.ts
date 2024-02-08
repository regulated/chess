export interface Piece {
  id: string; // same as name for now, can have other identifiers later
  name: string; // br wk 00 etc
  x: number; // 0-7 column
  y: number; // 0-7 row
  xOffset: number;
  yOffset: number;
  moved: boolean;
}

// 8x8 grid of square names should be lower case ex e4 d5
export type Squares = string[][];

export type Board = {
  pieces: Piece[];
  squares: string[][];
  dragging?: {
    id: string;
    initialPoint: Point;
    nextPoint: Point;
    valid: boolean;
    offset: Point;
  };
};

// dom location
export type Point = { x: number; y: number };

/*
export type BoardType = {
	square: String;
	piece: String;
	x: number;
	y: number;
};
*/

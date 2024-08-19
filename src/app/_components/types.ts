export interface Piece {
  id: string; // same as name for now, can have other identifiers later
  name: string; // br wk 00 etc
  x: number; // 0-7 column
  y: number; // 0-7 row
  xOffset: number;
  yOffset: number;
  moved: boolean;
  firstMove: boolean;
}

export interface Res {
	success: boolean;
	evaluation: string;
	mate: boolean;
	bestmove: string;
	continuation: string;
}

// 8x8 grid of square names should be lower case ex e4 d5
export type Squares = string[][];

export type Board = {
  pieces: Piece[];
  squares: string[][];
  validSquares: boolean[][];
  dragging?: {
    id: string;
    initialPoint: Point;
    nextPoint: Point;
    valid: boolean;
    offset: Point;
  };
	enPassantSquare: string;
  whiteTurn: boolean;
	halfTurns: number;
	fullTurns: number;
  blackKingsideCastling: boolean;
  blackQueensideCastling: boolean;
  whiteKingsideCastling: boolean;
  whiteQueensideCastling: boolean;
};

// dom location
export type Point = { x: number; y: number };

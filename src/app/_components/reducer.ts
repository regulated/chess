import { Piece, Squares, Board, Point } from "./types";

export const initial: Board = {
  pieces: [],
  squares: [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ],
  dragging: undefined,
};

export type Action =
  | { type: "ADD_PIECE"; payload: { piece: Piece } }
  | { type: "MOVE_PIECE"; payload: { piece: Piece; point: Point } }
  | { type: "DRAG_STARTED"; payload: { piece: Piece } }
  | {
      type: "DRAG_MOVED";
      payload: { piece: Piece; point: Point };
    }
  | { type: "DRAG_ENDED"; payload: { piece: Piece; offset: Point } }
  | { type: "ANIMATION_ENDED" };

export const reducer = (state: Board, action: Action) => {
  function clearPieceFromSquare(piece: Piece, squares: Squares) {
    const next = [...squares];
    next[piece.y][piece.x] = "";
    return next;
  }

  function setPieceToSquare(piece: Piece, squares: Squares) {
    const next = [...squares];
    next[piece.y][piece.x] = piece.id;
    return next;
  }

  function isValid(piece: Piece, point: Point, squares: Squares) {
    // for now, just check if it is in bounds and then do other rules later
    // can check for promotion here as well
    if (squares[point.y][point.x] !== "") return false;
    return true;
    // need to add logic to send the piece back to its original square
  }

  switch (action.type) {
    case "ADD_PIECE": {
      const nextState = { ...state };
      const { piece } = action.payload;

      // attempting to stop duplicates (working!)
      if (nextState.pieces.find((p) => p.id === piece.id) === undefined) {
        nextState.pieces.push(piece);
        nextState.squares = setPieceToSquare(piece, nextState.squares);
      }

      return nextState;
    }
    case "MOVE_PIECE": {
      const nextState = { ...state };
      const { piece, point } = action.payload;

      nextState.squares = clearPieceFromSquare(piece, nextState.squares);

      piece.x = point.x;
      piece.y = point.y;

      nextState.squares = setPieceToSquare(piece, nextState.squares);

      return nextState;
    }
    case "DRAG_STARTED": {
      const nextState = { ...state };
      const { piece } = action.payload;
      const { x, y } = piece;

      nextState.dragging = {
        id: piece.id,
        initialPoint: { x, y },
        nextPoint: { x, y },
        valid: true,
        offset: { x, y },
      };

      return nextState;
    }
    case "DRAG_MOVED": {
      const nextState = { ...state };
      const { piece, point } = action.payload;

      if (nextState.dragging) {
        nextState.dragging.nextPoint = point;
        nextState.dragging.valid = isValid(piece, point, nextState.squares);
      }

      return nextState;
    }
    case "DRAG_ENDED": {
      // this is also being called twice but the point is the same on both calls
      // so where is the double move coming from?
      const nextState = { ...state };
      const { piece, offset } = action.payload;

      if (nextState.dragging) {
        const { valid, initialPoint, nextPoint } = nextState.dragging;
        const point = valid ? nextPoint : initialPoint;

        // to cancel out double call
        if (point.x === piece.x && point.y === piece.y) return nextState;

        nextState.squares = clearPieceFromSquare(piece, nextState.squares);

        piece.x = point.x;
        piece.y = point.y;

        piece.xOffset += valid ? offset.x : 0;
        piece.yOffset += valid ? offset.y : 0;

        nextState.squares = setPieceToSquare(piece, nextState.squares);

        const index = nextState.pieces.findIndex((i) => i.id === piece.id);
        nextState.pieces[index] = piece;

        return nextState;
      }

      return nextState;
    }
    case "ANIMATION_ENDED": {
      const nextState = { ...state };

      nextState.dragging = undefined;

      return nextState;
    }
    default: {
      return state;
    }
  }
};

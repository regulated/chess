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
    /*
     * check that the piece moved
     * check that move is in bounds of piece type and board
     * check that there isn't a piece in the way
     * check that if there is a piece on destination it is the opposite color
     * check that the move doesn't result in own check (new or existing)
     */

    let tempX: number = piece.x;
    let tempY: number = piece.y;

    let valid: boolean = false;

    if (piece.x === point.x && piece.y === point.y) return valid;

    // Consider doing this one square at a time for non-knight pieces instead of
    // calculating final valid square and in between issues.
    // Then if ever step was blank and the final step was blank or occupied by
    // opposite color this would work.
    switch (piece.name) {
      case "br":
      case "wr":
        if (piece.x === point.x || piece.y === point.y) valid = true;
        break;
      case "bb":
      case "wb":
        if (squares[point.y][point.x].charAt(0) !== piece.name.charAt(0))
          valid = true;

        // breaking the whole system I think
        // while (tempX !== point.x || tempY !== point.y) {
        //   point.x > tempX ? tempX++ : tempX--;
        //   point.y > tempY ? tempY++ : tempY--;
        //   if (tempX > 7 || tempX < 0 || tempY > 7 || tempY < 0) return false;
        //   if (squares[tempY][tempX].charAt(0) !== "w") valid = false;
        // }
        break;

      case "bn":
      case "wn":
        if (
          (Math.abs(piece.x - point.x) === 1 &&
            Math.abs(piece.y - point.y) === 2) ||
          (Math.abs(piece.x - point.x) === 2 &&
            Math.abs(piece.y - point.y) === 1)
        )
          valid = true;
        break;
      case "bq":
      case "wq":
        if (piece.x) valid = true;
        break;
      case "bk":
      case "wk":
        if (
          Math.abs(piece.x - point.x) <= 1 &&
          Math.abs(piece.y - point.y) <= 1
        )
          valid = true;
        break;
      case "wp":
        if (piece.x === point.x && piece.y - 1 === point.y) valid = true;
        break;
      case "bp":
        if (piece.x === point.x && piece.y + 1 === point.y) valid = true;
        break;
    }

    return valid;
  }

  function capturePiece(attacker: Piece, defender: Piece, squares: Squares) {}

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

      piece.moved = false;

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
      const nextState = { ...state };
      const { piece, offset } = action.payload;

      if (nextState.dragging) {
        const { valid, initialPoint, nextPoint } = nextState.dragging;
        const point = valid ? nextPoint : initialPoint;

        // to cancel out double call
        if (piece.moved) return nextState;

        if (!valid) {
          piece.x = point.x;
          piece.y = point.y;
          piece.xOffset += offset.x;
          piece.yOffset += offset.y;
          piece.moved = true;
          const index = nextState.pieces.findIndex((i) => i.id === piece.id);
          nextState.pieces[index] = piece;
          return nextState;
        }

        nextState.squares = clearPieceFromSquare(piece, nextState.squares);

        piece.x = point.x;
        piece.y = point.y;
        piece.xOffset += offset.x;
        piece.yOffset += offset.y;

        piece.moved = true;

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

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
  whiteTurn: true,
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
     * check that it is the right side's turn
     * check that the piece moved
     * check that move is in bounds of piece type and board
     * check that there isn't a piece in the way
     * check that if there is a piece on destination it is the opposite color
     * check that the move doesn't result in own check (new or existing)
     * check for pawn promotion
     * 	if pawn hits end rank, for now just auto queen, piece.name = "xq"
     */

    let valid: boolean = false;

    // console.log(state.whiteTurn + " " + piece.name.charAt(0));
    // if (
    //   (state.whiteTurn && piece.name.charAt(0) === "b") ||
    //   (!state.whiteTurn && piece.name.charAt(0) === "w")
    // ) {
    //   return false;
    // }

    if (piece.x === point.x && piece.y === point.y) {
      return valid;
    }

    switch (piece.name) {
      case "br":
      case "wr":
        if (piece.x === point.x || piece.y === point.y) {
          if (piece.x < point.x) {
            for (let i = piece.x + 1; i < point.x; i++) {
              if (squares[piece.y][i] !== "") return false;
            }
          }
          if (piece.y < point.y) {
            for (let i = piece.y + 1; i < point.y; i++) {
              if (squares[i][piece.x] !== "") return false;
            }
          }
          if (piece.x > point.x) {
            for (let i = point.x + 1; i < piece.x; i++) {
              if (squares[piece.y][i] !== "") return false;
            }
          }
          if (piece.y > point.y) {
            for (let i = point.y + 1; i < piece.y; i++) {
              if (squares[i][piece.x] !== "") return false;
            }
          }
          valid = true;
        }
        break;

      case "bb":
      case "wb":
        if (Math.abs(piece.x - point.x) === Math.abs(piece.y - point.y)) {
          if (piece.x < point.x && piece.y < point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y + i][piece.x + i].charAt(0) !== "")
                return false;
            }
          }
          if (piece.x < point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x + i].charAt(0) !== "")
                return false;
            }
          }
          if (piece.x > point.x && piece.y < point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y + i][piece.x - i].charAt(0) !== "")
                return false;
            }
          }
          if (piece.x > point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x - i].charAt(0) !== "")
                return false;
            }
          }
          valid = true;
        }
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
        if (piece.x === point.x || piece.y === point.y) {
          if (piece.x < point.x) {
            for (let i = piece.x + 1; i < point.x; i++) {
              if (squares[piece.y][i] !== "") return false;
            }
          }
          if (piece.y < point.y) {
            for (let i = piece.y + 1; i < point.y; i++) {
              if (squares[i][piece.x] !== "") return false;
            }
          }
          if (piece.x > point.x) {
            for (let i = point.x + 1; i < piece.x; i++) {
              if (squares[piece.y][i] !== "") return false;
            }
          }
          if (piece.y > point.y) {
            for (let i = point.y + 1; i < piece.y; i++) {
              if (squares[i][piece.x] !== "") return false;
            }
          }
          valid = true;
        } else if (
          Math.abs(piece.x - point.x) === Math.abs(piece.y - point.y)
        ) {
          if (piece.x < point.x && piece.y < point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y + i][piece.x + i].charAt(0) !== "")
                return false;
            }
          }
          if (piece.x < point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x + i].charAt(0) !== "")
                return false;
            }
          }
          if (piece.x > point.x && piece.y < point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y + i][piece.x - i].charAt(0) !== "")
                return false;
            }
          }
          if (piece.x > point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x - i].charAt(0) !== "")
                return false;
            }
          }
          valid = true;
        }
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

    if (valid && squares[point.y][point.x].charAt(0) !== piece.name.charAt(0))
      valid = true;
    else valid = false;

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

        // check if there is a piece on that square already
        // if move is valid, the piece is captured and removed from state.pieces[]
        if (nextState.squares[point.y][point.x].charAt(0) !== "") {
          const ind = nextState.pieces.findIndex(
            (p) => p.x === point.x && p.y === point.y,
          );
          nextState.pieces = nextState.pieces.splice(ind, 1);
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

        nextState.whiteTurn = !nextState.whiteTurn;

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

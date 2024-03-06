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

  function isValid(
    piece: Piece,
    point: Point,
    squares: Squares,
    depth: number,
  ) {
    /*
     * check that it is the right side's turn
     * check that the piece moved
     * check that move is in bounds of piece type and board
     * check that there isn't a piece in the way
     * check that if there is a piece on destination it is the opposite color
     * check that the move doesn't result in own check (new or existing)
     * check for pawn promotion (doing this after move has been made)
     * 	if pawn hits end rank, for now just auto queen, piece.name = "xq"
     */

    /*
     * Idea for check:
     * have a subfunction that checks for each piece in resulting position
     * if either king is in check
     * if opposite king: create an incheck state that must be gotten rid of
     * 	just continuing would work here bc the invalid check will take care
     * 	of this situation on the next player's turn
     * if current king: return invalid
     * */

    /*
     * Castling
     * Check that the king and the rook on required side have not moved
     * check that there are no pieces b/w the king and the rook
     * once check is enabled, make sure the king does not pass through check when castling
     * */

    /*
     * en passant
     * check that wp is on 5th rank (3) or bp is on 4th rank (4)
     * check that the opposite color pawn is directly to the side
     * check that that specific pawn just moved there in two moves
     * capture diagonally and remove the pawn to the side
     * */

    let valid = false;

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
              if (squares[piece.y + i][piece.x + i] !== "") return false;
            }
          }
          if (piece.x < point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x + i] !== "") return false;
            }
          }
          if (piece.x > point.x && piece.y < point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y + i][piece.x - i] !== "") return false;
            }
          }
          if (piece.x > point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x - i] !== "") return false;
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
              if (squares[piece.y + i][piece.x + i] !== "") return false;
            }
          }
          if (piece.x < point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x + i] !== "") return false;
            }
          }
          if (piece.x > point.x && piece.y < point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y + i][piece.x - i] !== "") return false;
            }
          }
          if (piece.x > point.x && piece.y > point.y) {
            for (let i = 1; i < Math.abs(point.y - piece.y); i++) {
              if (squares[piece.y - i][piece.x - i] !== "") return false;
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
        if (piece.firstMove) {
          if (
            piece.x === point.x &&
            piece.y - 2 === point.y &&
            squares[point.y][point.x] === ""
          )
            valid = true;
        }
        if (
          piece.x === point.x &&
          piece.y - 1 === point.y &&
          squares[point.y][point.x] === ""
        )
          valid = true;
        if (
          Math.abs(piece.x - point.x) === 1 &&
          piece.y - 1 === point.y &&
          squares[point.y][point.x].startsWith("b")
        )
          valid = true;

        break;

      case "bp":
        if (piece.firstMove) {
          if (
            piece.x === point.x &&
            piece.y + 2 === point.y &&
            squares[point.y][point.x] === ""
          )
            valid = true;
        }
        if (
          piece.x === point.x &&
          piece.y + 1 === point.y &&
          squares[point.y][point.x] === ""
        )
          valid = true;
        if (
          Math.abs(piece.x - point.x) === 1 &&
          piece.y + 1 === point.y &&
          squares[point.y][point.x].startsWith("w")
        )
          valid = true;

        break;
    }

    if (
      valid &&
      piece.name.charAt(1) !== "p" &&
      !squares[point.y][point.x].startsWith(piece.name.charAt(0))
    )
      valid = true;
    else if (piece.name.charAt(1) !== "p") valid = false;

    /*
     * Check the position and make sure the current side is not in check
     * if current side is in check, return false
     * */

    // loop through all pieces on opposite side
    // check that none of their pieces have a valid move to the
    // location of the current sides king

    if (depth && valid) {
      // base case where piece moves to another square, different for:
      // 	en passant
      // 	castling
      // 	need to check for capturing the piece issuing the check

      const currentKing: Piece | undefined = state.pieces.find(
        (p) => p.name === piece.name.charAt(0) + "k",
      );

      if (currentKing === undefined) return false;

      const currentKingPoint: Point =
        piece.name.charAt(1) === "k"
          ? { x: point.x, y: point.y }
          : { x: currentKing.x, y: currentKing.y };

      const tempSquares: Squares = JSON.parse(JSON.stringify(squares));
      tempSquares[piece.y][piece.x] = "";
      tempSquares[point.y][point.x] = piece.name;

      state.pieces.forEach((p) => {
        if (
          !p.name.startsWith(currentKing.name.charAt(0)) &&
          isValid(p, currentKingPoint, tempSquares, 0) &&
          (point.x !== p.x || point.y !== p.y)
        ) {
          valid = false;
        }
      });
    }

    return valid;
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
        nextState.dragging.valid = isValid(piece, point, nextState.squares, 1);
      }

      return nextState;
    }
    case "DRAG_ENDED": {
      const nextState = { ...state };
      const { piece, offset } = action.payload;

      // console.log("Drag just ended");
      // console.log(piece);
      // console.log(nextState);

      if (nextState.dragging) {
        const { valid, initialPoint, nextPoint } = nextState.dragging;
        const point = valid ? nextPoint : initialPoint;

        // to cancel out double call
        if (piece.moved && valid) {
          nextState.whiteTurn = !nextState.whiteTurn;
          return nextState;
        }
        if (piece.moved) {
          return nextState;
        }

        if (!valid) {
          piece.x = point.x;
          piece.y = point.y;
          piece.xOffset += offset.x;
          piece.yOffset += offset.y;
          piece.moved = true;
          // nextState.valid = false;
          // nextState.whiteTurn = !nextState.whiteTurn;
          const index = nextState.pieces.findIndex((i) => i.id === piece.id);
          nextState.pieces[index] = piece;
          // console.log("Not valid ");
          // console.log(nextState);
          // console.log(piece);
          return nextState;
        }

        // check if there is a piece on that square already
        // if move is valid, the piece is captured and removed from state.pieces[]
        if (nextState.squares[point.y][point.x] !== "") {
          const ind = nextState.pieces.findIndex(
            (p) => p.x === point.x && p.y === point.y,
          );
          nextState.pieces.splice(ind, 1);
        }

        nextState.squares = clearPieceFromSquare(piece, nextState.squares);

        piece.x = point.x;
        piece.y = point.y;
        piece.xOffset += offset.x;
        piece.yOffset += offset.y;

        piece.moved = true;
        piece.firstMove = false;

        // check for promotion
        if (piece.name === "wp" && piece.y === 0) piece.name = "wq";
        if (piece.name === "bp" && piece.y === 7) piece.name = "bq";

        nextState.squares = setPieceToSquare(piece, nextState.squares);

        const index = nextState.pieces.findIndex((i) => i.id === piece.id);
        nextState.pieces[index] = piece;

        nextState.whiteTurn = !nextState.whiteTurn;

        // console.log("end dragging ");
        // console.log(piece);
        // console.log(nextState);
        return nextState;
      }

      // console.log("not dragging ");
      // console.log(piece);
      // console.log(nextState);
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

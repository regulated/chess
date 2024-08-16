import { Piece, Squares, Board, Point } from "./types";
import { format } from "./format"

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
	validSquares: [
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
		[false, false, false, false, false, false, false, false],
	],
	dragging: undefined,
	enPassantSquare: '',
	whiteTurn: true,
	halfTurns: 0,
	fullTurns: 1,
  blackKingsideCastling: true,
  blackQueensideCastling: true,
  whiteKingsideCastling: true,
  whiteQueensideCastling: true,
};

export type Action =
	| { type: "ADD_PIECE"; payload: { piece: Piece } }
	| { type: "CLEAR_BOARD" }
	| { type: "TAP_PIECE"; payload: { piece: Piece } }
	| { type: "CLEAR_TAP" }
	| { type: "MOVE_PIECE"; payload: { piece: Piece; point: Point } }
	| { type: "DRAG_STARTED"; payload: { piece: Piece } }
	| { type: "DRAG_MOVED"; payload: { piece: Piece; point: Point } }
	| { type: "DRAG_ENDED"; payload: { piece: Piece; offset: Point } }
	| { type: "ANIMATION_ENDED" }
	| { type: "CHECKMATE" };

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

				// Castling
				/*
				if (
					// check kings first move
					(piece.firstMove &&
						// check not in check

						//check left rook
						piece.x - point.x === -2 &&
						// rooks first move
						squares[piece.y][piece.x - 1] === "" &&
						squares[piece.y][piece.x - 2] === "" &&
						squares[piece.y][piece.x - 3] === "") ||
						// squares[piece.y][piece.x - 4] === '' &&
					//check right rook
					(piece.x - point.x === 2 &&
						// rooks first move
						squares[piece.y][piece.x + 1] === "" &&
						squares[piece.y][piece.x + 2] === "")
					// squares[piece.y][piece.x + 3] === '' &&
				) {
					// move rook one to left / right of original king location
					valid = true;
				}
				*/

				break;

			case "wp":
				if (
					piece.firstMove &&
					piece.x === point.x &&
					piece.y - 2 === point.y &&
					squares[point.y + 1][point.x] === "" &&
					squares[point.y][point.x] === ""
				)
					valid = true;
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
				if (
					piece.firstMove &&
					piece.x === point.x &&
					piece.y + 2 === point.y &&
					squares[point.y - 1][point.x] === "" &&
					squares[point.y][point.x] === ""
				)
					valid = true;
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
		case "CLEAR_BOARD": {
			const nextState = { ...state };

			nextState.pieces.length = 0; // = [];
			for (let y = 0; y <= 7; y++) {
				for (let x = 0; x <= 7; x++) {
					nextState.squares[y][x] = "";
					nextState.validSquares[y][x] = false;
				}
			}
			nextState.dragging = undefined;
			nextState.whiteTurn = true;
			nextState.halfTurns = 0;
			nextState.fullTurns = 1;

			return nextState;
		}
		// onTap
		// run through all squares, if any are valid for that piece mark them
		// if one of them is clicked, move piece there.
		// if another piece is clicked, run TAP_PIECE with new piece
		case "TAP_PIECE": {
			const nextState = { ...state };
			const { piece } = action.payload;

			for (let y = 0; y <= 7; y++) {
				for (let x = 0; x <= 7; x++) {
					if (isValid(piece, { x, y }, nextState.squares, 1)) {
						nextState.validSquares[y][x] = true;
					}
				}
			}

			return nextState;
		}
		case "CLEAR_TAP": {
			const nextState = { ...state };

			for (let y = 0; y <= 7; y++) {
				for (let x = 0; x <= 7; x++) {
					nextState.validSquares[y][x] = false;
				}
			}

			return nextState;
		}
		case "MOVE_PIECE": {
			const nextState = { ...state };
			const { piece, point } = action.payload;

			nextState.squares = clearPieceFromSquare(piece, nextState.squares);

			// check if there is a piece on that square already
			// if move is valid, the piece is captured and removed from state.pieces[]
			if (nextState.squares[point.y][point.x] !== "") {
				const ind = nextState.pieces.findIndex(
					(p) => p.x === point.x && p.y === point.y,
				);
				nextState.pieces.splice(ind, 1);
				nextState.halfTurns = -1;
			}

			// if a pawn moved reset half turn counter
			if (piece.name.charAt(1) === 'p') nextState.halfTurns = -1;

			// if a pawn moved two squares, set the square behind it as the enPassantSquare, 
			// else clear enPassantSquare
			nextState.enPassantSquare = '';
			if (piece.name.charAt(1) === 'p' && Math.abs(point.y - piece.y) === 2) {
				nextState.enPassantSquare = piece.x.toString() + ((piece.y + point.y) / 2).toString();
			}
			
			piece.x = point.x;
			piece.y = point.y;
			piece.firstMove = false;

			// check for promotion
			if (piece.name === "wp" && piece.y === 0) piece.name = "wq";
			if (piece.name === "bp" && piece.y === 7) piece.name = "bq";

			// check for castling (move king and rook)
			
			// set castling to false if rook or king has moved
			if (piece.id === "br0") nextState.blackQueensideCastling = false; 
			if (piece.id === "br1") nextState.blackKingsideCastling = false; 
			if (piece.id === "wr0") nextState.whiteQueensideCastling = false; 
			if (piece.id === "wr1") nextState.whiteKingsideCastling = false; 
			if (piece.name === "bk") {
				nextState.blackQueensideCastling = false; 
				nextState.blackKingsideCastling = false; 
			}
			if (piece.name === "wk") {
				nextState.whiteQueensideCastling = false; 
				nextState.whiteKingsideCastling = false; 
			}

			nextState.whiteTurn = !nextState.whiteTurn;
			if (nextState.whiteTurn) nextState.fullTurns += 1;
			nextState.halfTurns += 1;

			const index = nextState.pieces.findIndex((i) => i.id === piece.id);
			nextState.pieces[index] = piece;

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

			if (nextState.dragging) {
				const { valid, initialPoint, nextPoint } = nextState.dragging;
				const point = valid ? nextPoint : initialPoint;

				// to cancel out double call in dev
				if (piece.moved && valid) {
					nextState.whiteTurn = !nextState.whiteTurn;
					if (nextState.whiteTurn) nextState.fullTurns += 1;
					nextState.halfTurns += 1;
					return nextState;
				}
				if (piece.moved && !valid) {
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
					// if (nextState.whiteTurn) nextState.fullTurns += 1;
					// nextState.halfTurns += 1;
					const index = nextState.pieces.findIndex((i) => i.id === piece.id);
					nextState.pieces[index] = piece;
					return nextState;
				}

				// if a pawn moved two squares, set the square behind it as the enPassantSquare, 
				// else clear enPassantSquare
				nextState.enPassantSquare = '';
				if (piece.name.charAt(1) === 'p' && Math.abs(point.y - piece.y) === 2) {
					nextState.enPassantSquare = 
						piece.x.toString() + ((piece.y + point.y) / 2).toString();
				}

				// check if there is a piece on that square already
				// if move is valid, the piece is captured and removed from state.pieces[]
				if (nextState.squares[point.y][point.x] !== "") {
					const ind = nextState.pieces.findIndex(
						(p) => p.x === point.x && p.y === point.y,
					);
					nextState.pieces.splice(ind, 1);
					nextState.halfTurns = -1;
				}

				nextState.squares = clearPieceFromSquare(piece, nextState.squares);

				piece.x = point.x;
				piece.y = point.y;
				piece.xOffset += offset.x;
				piece.yOffset += offset.y;

				piece.moved = true;
				piece.firstMove = false;

				// if a pawn moved reset half turn counter
				if (piece.name.charAt(1) === 'p') nextState.halfTurns = -1;

				// check for promotion
				if (piece.name === "wp" && piece.y === 0) piece.name = "wq";
				if (piece.name === "bp" && piece.y === 7) piece.name = "bq";

			// check for castling (move king and rook)
			
			// set castling to false if rook or king has moved
			if (piece.id === "br0") nextState.blackQueensideCastling = false; 
			if (piece.id === "br1") nextState.blackKingsideCastling = false; 
			if (piece.id === "wr0") nextState.whiteQueensideCastling = false; 
			if (piece.id === "wr1") nextState.whiteKingsideCastling = false; 
			if (piece.name === "bk") {
				nextState.blackQueensideCastling = false; 
				nextState.blackKingsideCastling = false; 
			}
			if (piece.name === "wk") {
				nextState.whiteQueensideCastling = false; 
				nextState.whiteKingsideCastling = false; 
			}

				nextState.squares = setPieceToSquare(piece, nextState.squares);

				const index = nextState.pieces.findIndex((i) => i.id === piece.id);
				nextState.pieces[index] = piece;

				nextState.whiteTurn = !nextState.whiteTurn;
				if (nextState.whiteTurn) nextState.fullTurns += 1;
				nextState.halfTurns += 1;

				return nextState;
			}

			return nextState;
			}

		case "ANIMATION_ENDED": {
			const nextState = { ...state };

			nextState.dragging = undefined;

			return nextState;
		}
		case "CHECKMATE": {
			let mate = true;

			state.pieces.forEach((p) => {
				if (
					(p.name.startsWith("w") && state.whiteTurn) ||
					(p.name.startsWith("b") && !state.whiteTurn)
				) {
					for (let y = 0; y <= 7; y++) {
						for (let x = 0; x <= 7; x++) {
							if (isValid(p, { x, y }, state.squares, 1)) {
								mate = false;
							}
						}
					}
				}
			});

			if (mate) {
				console.log("Checkmate");
				state.whiteTurn ? console.log("Black Wins") : console.log("White Wins");
			}

			return state;
		}
		default: {
			return state;
		}
	}
};

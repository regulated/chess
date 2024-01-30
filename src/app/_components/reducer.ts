import { BoardType, Point } from "./types";

export type Action =
	| { type: "MOVE_PIECE"; payload: { piece: String; point: Point } }
	| { type: "DRAG_STARTED"; payload: { piece: String } }
	| { type: "DRAG_MOVED"; payload: { piece: String; point: Point } }
	| { type: "DRAG_ENDED"; payload: { piece: String } };

export const reducer = (state: BoardType, action: Action) => {

	function setPiecetoSquare(piece: String, square: String) {

		// get the square coords 
		let x: number = square.charCodeAt(0) - 65;
		let y: number = square.charCodeAt(1) - 49;

		// check legality of move here? 
		// do rest or return with error / do nothing 

		// set the state to the new piece
		state[x][y].piece: String = piece;
	}

	switch (action.type) {
		case "MOVE_PIECE": {
			break;
		}
		case "DRAG_STARTED": {
			break;

		}
		case "DRAG_MOVED": {
			break;

		}
		case "DRAG_ENDED": {
			break;

		}
		default:
			break;

	}

};

export const initial: BoardType[][] = [
	[
		{
			square: "A8",
			piece: "BR",
			x: 0,
			y: 0,
		},
		{
			square: "B8",
			piece: "BN",
			x: 0,
			y: 0,
		},
		{
			square: "C8",
			piece: "BB",
			x: 0,
			y: 0,
		},
		{
			square: "D8",
			piece: "BQ",
			x: 0,
			y: 0,
		},
		{
			square: "E8",
			piece: "BK",
			x: 0,
			y: 0,
		},
		{
			square: "F8",
			piece: "BB",
			x: 0,
			y: 0,
		},
		{
			square: "G8",
			piece: "BN",
			x: 0,
			y: 0,
		},
		{
			square: "H8",
			piece: "BR",
			x: 0,
			y: 0,
		},
	],
	[
		{
			square: "A7",
			piece: "BP",
			x: 0,
			y: 0,
		},
		{
			square: "B7",
			piece: "BP",
			x: 0,
			y: 0,
		},
		{
			square: "C7",
			piece: "BP",
			x: 0,
			y: 0,
		},
		{
			square: "D7",
			piece: "BP",
			x: 0,
			y: 0,
		},
		{
			square: "E7",
			piece: "BP",
			x: 0,
			y: 0,
		},
		{
			square: "F7",
			piece: "BP",
			x: 0,
			y: 0,
		},
		{
			square: "G7",
			piece: "BP",
			x: 0,
			y: 0,
		},
		{
			square: "H7",
			piece: "BP",
			x: 0,
			y: 0,
		},
	],
	[
		{
			square: "A6",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "B6",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "C6",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "D6",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "E6",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "F6",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "G6",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "H6",
			piece: "00",
			x: 0,
			y: 0,
		},
	],
	[
		{
			square: "A5",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "B5",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "C5",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "D5",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "E5",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "F5",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "G5",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "H5",
			piece: "00",
			x: 0,
			y: 0,
		},
	],
	[
		{
			square: "A4",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "B4",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "C4",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "D4",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "E4",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "F4",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "G4",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "H4",
			piece: "00",
			x: 0,
			y: 0,
		},
	],
	[
		{
			square: "A3",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "B3",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "C3",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "D3",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "E3",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "F3",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "G3",
			piece: "00",
			x: 0,
			y: 0,
		},
		{
			square: "H3",
			piece: "00",
			x: 0,
			y: 0,
		},
	],
	[
		{
			square: "A2",
			piece: "WP",
			x: 0,
			y: 0,
		},
		{
			square: "B2",
			piece: "WP",
			x: 0,
			y: 0,
		},
		{
			square: "C2",
			piece: "WP",
			x: 0,
			y: 0,
		},
		{
			square: "D2",
			piece: "WP",
			x: 0,
			y: 0,
		},
		{
			square: "E2",
			piece: "WP",
			x: 0,
			y: 0,
		},
		{
			square: "F2",
			piece: "WP",
			x: 0,
			y: 0,
		},
		{
			square: "G2",
			piece: "WP",
			x: 0,
			y: 0,
		},
		{
			square: "H2",
			piece: "WP",
			x: 0,
			y: 0,
		},
	],
	[
		{
			square: "A1",
			piece: "WR",
			x: 0,
			y: 0,
		},
		{
			square: "B1",
			piece: "WN",
			x: 0,
			y: 0,
		},
		{
			square: "C1",
			piece: "WB",
			x: 0,
			y: 0,
		},
		{
			square: "D1",
			piece: "WQ",
			x: 0,
			y: 0,
		},
		{
			square: "E1",
			piece: "WK",
			x: 0,
			y: 0,
		},
		{
			square: "F1",
			piece: "WB",
			x: 0,
			y: 0,
		},
		{
			square: "G1",
			piece: "WN",
			x: 0,
			y: 0,
		},
		{
			square: "H1",
			piece: "WR",
			x: 0,
			y: 0,
		},
	],
];

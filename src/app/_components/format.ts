import { Piece, Squares, Board, Point } from "./types";

// take existing board array and convert to FEN format
export const format = (board: Board) => {
	
	let boardString: String = '';
	let gap: number = 0;

	// pieces
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			switch (board.squares[i][j].charAt(0)) {
				case 'w':
					if (gap > 0) { 
						boardString += gap.toString();
						gap = 0;
					}
					boardString += board.squares[i][j].charAt(1).toUpperCase();
					break;
				case 'b':
					if (gap > 0) {
						boardString += gap.toString();
						gap = 0;
					}
					boardString += board.squares[i][j].charAt(1).toLowerCase();
					break;
				default:
					gap++;
					break;
			}
		if (j == 7 && board.squares[i][j] == '') boardString += gap.toString();
		}
		gap = 0;
		if (i != 7) boardString += '/';
	}

	// active color
	board.whiteTurn 
		? boardString += ' w ' 
		: boardString += ' b ';

	// castling availability 
	if (board.whiteKingsideCastling) boardString += 'K';
	if (board.whiteQueensideCastling) boardString += 'Q';
	if (board.blackKingsideCastling) boardString += 'k';
	if (board.blackQueensideCastling) boardString += 'q';
	if (!board.whiteKingsideCastling &&
			!board.whiteQueensideCastling &&
			!board.blackKingsideCastling &&
			!board.blackQueensideCastling) boardString += '-';
	
	// en passant target square
	console.log("eps: " + board.enPassantSquare)
	if (board.enPassantSquare != '') {
	boardString += ' ' + board.enPassantSquare ;
	}
	else boardString += ' -';
	
	// half turns 
	boardString += ' ' + board.halfTurns.toString();
	
	// full turns 

	return boardString;
} 

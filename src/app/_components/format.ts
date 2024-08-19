import type { Board } from "./types";

// take existing board array and convert to FEN format
// example FEN after 1. e4 c5 2. nf3 
// 	rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
// 	rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
// 	rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2
// 	rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
export const format = (board: Board) => {
	
	let boardString = '';
	let gap = 0;

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
	if (board.enPassantSquare != '') {
	boardString += ' ' + board.enPassantSquare ;
	}
	else boardString += ' -';
	
	// half turns 
	boardString += ' ' + board.halfTurns.toString();
	
	// full turns 
	boardString += ' ' + board.fullTurns.toString();

	return boardString;
} 

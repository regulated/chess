En Passant

Castling
Set a check for King and Rooks to see if they've moved
Distinguish b/w left and right rook

!!IMPORTANT
PGN
New page
Import a pgn from lichess.org
translate the pgn into my data structure
use this to add_piece all of the pieces
or use move_piece to move through the moves of the game
forward and back controls, so need to have forward and back memory somehow

Far in the future
Online game against another player?
game session, users, player ids, save games, evaluate position with stockfish

Current Idea
Lichess game, and implement an eval bar based on current game state
backwards and forward buttons

Convert current board array into stockfish eval / pgn format

I'm a bit late, but https://stockfish.online is a REST GET API for Stockfish. 
Make requests with a FEN string, depth, and mode. 
For example, making a GET request to https://stockfish.online/api/stockfish.php?fen=r2q1rk1/ppp2ppp/3bbn2/3p4/8/1B1P4/PPP2PPP/RNB1QRK1 w - - 5 11&depth=13&mode=bestmove 
would get the best move for the given FEN string at depth 13. 
Hope this helps!

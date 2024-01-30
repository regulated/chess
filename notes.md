Reset Button

Drag functionality
Move pieces
Track square that piece is dropped on
check the validity of the Move
if valid move piece to that square
if not valid move piece back to original square

chess rules ex en passant and castling come later

board should be static object of squares

need to rethink how board and state play together at high level
need a grid to host pieces
pieces need to move and evaluate squares for legality

maybe have a large board state that has 8x8 squares and 8x8 pieces on said squares, or just the pieces and separate squares?

pieces should be 8x8 array ex ["BR" "BB" "00"]
Yes have state be just the array of pieces, display can use different arrays but the logic should just be this 8x8 array of pieces that can move and check squares

"use client";

import { squareStyle, white, black } from "../../styles/boardStyles";

// import { Console } from "console";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import { api } from "~/trpc/react";

type squareType = {
  square: String;
  piece: String;
};

const BoardState: squareType[][] = [
  [
    { square: "A8", piece: "BR" },
    { square: "B8", piece: "BN" },
    { square: "C8", piece: "BB" },
    { square: "D8", piece: "BQ" },
    { square: "E8", piece: "BK" },
    { square: "F8", piece: "BB" },
    { square: "G8", piece: "BN" },
    { square: "H8", piece: "BR" },
  ],
  [
    { square: "A7", piece: "BP" },
    { square: "B7", piece: "BP" },
    { square: "C7", piece: "BP" },
    { square: "D7", piece: "BP" },
    { square: "E7", piece: "BP" },
    { square: "F7", piece: "BP" },
    { square: "G7", piece: "BP" },
    { square: "H7", piece: "BP" },
  ],
  [
    { square: "A6", piece: "00" },
    { square: "B6", piece: "00" },
    { square: "C6", piece: "00" },
    { square: "D6", piece: "00" },
    { square: "E6", piece: "00" },
    { square: "F6", piece: "00" },
    { square: "G6", piece: "00" },
    { square: "H6", piece: "00" },
  ],
  [
    { square: "A5", piece: "00" },
    { square: "B5", piece: "00" },
    { square: "C5", piece: "00" },
    { square: "D5", piece: "00" },
    { square: "E5", piece: "00" },
    { square: "F5", piece: "00" },
    { square: "G5", piece: "00" },
    { square: "H5", piece: "00" },
  ],
  [
    { square: "A4", piece: "00" },
    { square: "B4", piece: "00" },
    { square: "C4", piece: "00" },
    { square: "D4", piece: "00" },
    { square: "E4", piece: "00" },
    { square: "F4", piece: "00" },
    { square: "G4", piece: "00" },
    { square: "H4", piece: "00" },
  ],
  [
    { square: "A3", piece: "00" },
    { square: "B3", piece: "00" },
    { square: "C3", piece: "00" },
    { square: "D3", piece: "00" },
    { square: "E3", piece: "00" },
    { square: "F3", piece: "00" },
    { square: "G3", piece: "00" },
    { square: "H3", piece: "00" },
  ],
  [
    { square: "A2", piece: "WP" },
    { square: "B2", piece: "WP" },
    { square: "C2", piece: "WP" },
    { square: "D2", piece: "WP" },
    { square: "E2", piece: "WP" },
    { square: "F2", piece: "WP" },
    { square: "G2", piece: "WP" },
    { square: "H2", piece: "WP" },
  ],
  [
    { square: "A1", piece: "WR" },
    { square: "B1", piece: "WN" },
    { square: "C1", piece: "WB" },
    { square: "D1", piece: "WQ" },
    { square: "E1", piece: "WK" },
    { square: "F1", piece: "WB" },
    { square: "G1", piece: "WK" },
    { square: "H1", piece: "WR" },
  ],
];

export function Board() {
  let white: Boolean = true;

  return (
    <>
      <div className="grid-rows-8 grid grid-cols-8">
        {BoardState.map((r) => {
          white = !white;
          return r.map((s) => {
            white = !white;
            if (white) {
              return (
                <div className={squareStyle + white}>
                  {s.square} {s.piece}
                </div>
              );
            } else {
              return (
                <div className={squareStyle + black}>
                  {s.square} {s.piece}
                </div>
              );
            }
          });
        })}
      </div>
    </>
  );
}

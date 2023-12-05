"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

const BoardState: string[][] = [
  ["R", "N", "B", "Q", "K", "B", "K", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "K", "R"],
];

export function Board() {
  return (
    <>
      <div className="grid-rows-8 grid grid-cols-8">
        {BoardState.map((row) => row.map((square) => <div>{square[0]}</div>))}
      </div>
    </>
  );
}

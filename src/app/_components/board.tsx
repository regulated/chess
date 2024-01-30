"use client";

import { useState, useReducer, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  whiteSquareStyle,
  blackSquareStyle,
  boardStyle,
} from "../../styles/boardStyles";
import { reducer, initial } from "./reducer";

const [boardState, dispatch] = useReducer(reducer, initial);

export function Board() {
  let white: Boolean = true;
  const border = useRef(null);

  return (
    <>
      <motion.div className={boardStyle} ref={border}>
        {boardState.map((r, rkey) => {
          white = !white;
          return r.map((s, skey) => {
            white = !white;
            if (white) {
              return (
                <motion.li
                  key={skey}
                  className={whiteSquareStyle}
                  whileHover={{ backgroundColor: "#00dd00" }}
                >
                  <div>{s.square}</div>
                  <motion.div
                    dragConstraints={border}
                    dragElastic={0}
                    whileHover={
                      s.piece[0] == "W" || s.piece[0] == "B"
                        ? {
                            scale: 1.1,
                          }
                        : { scale: 1.0 }
                    }
                    drag={s.piece[0] == "W" || s.piece[0] == "B" ? true : false}
                    dragSnapToOrigin={true}
                    onDragEnd={(event, info) =>
                      console.log(info.point.x, info.point.y)
                    }
                  >
                    {s.piece}
                  </motion.div>
                </motion.li>
              );
            } else {
              return (
                <motion.li
                  key={skey}
                  className={blackSquareStyle}
                  whileHover={{ backgroundColor: "#00dd00" }}
                >
                  <div>{s.square}</div>
                  <motion.div
                    dragConstraints={border}
                    dragElastic={0}
                    whileHover={
                      s.piece[0] == "W" || s.piece[0] == "B"
                        ? {
                            scale: 1.1,
                          }
                        : { scale: 1.0 }
                    }
                    drag={s.piece[0] == "W" || s.piece[0] == "B" ? true : false}
                    dragSnapToOrigin={true}
                    onDragEnd={(event, info) =>
                      console.log(info.point.x, info.point.y)
                    }
                  >
                    {s.piece}
                  </motion.div>
                </motion.li>
              );
            }
          });
        })}
      </motion.div>
    </>
  );
}

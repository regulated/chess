"use client";

import { useReducer, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  whiteSquareStyle,
  blackSquareStyle,
  boardStyle,
  wrapper,
} from "../../styles/boardStyles";
import { reducer, initial } from "./reducer";
import useScreenSize from "./useScreenSize";

export function Board() {
  const [state, dispatch] = useReducer(reducer, initial);

  // (view width / 2) - (48 * 4) should be coords of left of board
  const screenSize = useScreenSize();

  useEffect(() => {
    dispatch({
      type: "ADD_PIECE",
      payload: { piece: { id: 1, name: "br", x: 0, y: 0 } },
    });
    dispatch({
      type: "ADD_PIECE",
      payload: { piece: { id: 2, name: "wk", x: 4, y: 7 } },
    });
  }, []);

  // const border = useRef(null);

  const draggingPiece = state.pieces.find((p) => p.id === state.dragging?.id);

  return (
    <>
      <div className={wrapper}>
        <div className={boardStyle}>
          {state.squares.map((row: string[], y: number) => {
            return row.map((square: string, x: number) => {
              return (
                <div
                  className={`${
                    (x + y) % 2 == 0 ? whiteSquareStyle : blackSquareStyle
                  }`}
                  key={`${y}_${x}`}
                >
                  {square}
                </div>
              );
            });
          })}
        </div>
        {state.dragging && draggingPiece && (
          <>
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "rgba(239, 239, 239,.8)",
                x:
                  state.dragging.initialPoint.x * 48 +
                  screenSize.width / 2 -
                  192,
                y:
                  state.dragging.initialPoint.y * 48 +
                  screenSize.height / 2 -
                  192,
              }}
            />
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                border: "1px solid #000",
                backgroundColor: state.dragging.valid
                  ? "rgb(152, 195, 121)"
                  : "rgb(224, 109, 118)",
                x:
                  state.dragging.initialPoint.x * 48 +
                  screenSize.width / 2 -
                  192,
                y:
                  state.dragging.initialPoint.y * 48 +
                  screenSize.height / 2 -
                  192,
              }}
            />
          </>
        )}
        {state.pieces.map((piece) => {
          const x = piece.x * 48 + screenSize.width / 2 - 192;
          const y = piece.y * 48 + screenSize.height / 2 - 192;
          const isDragging = piece.id === state.dragging?.id;
          return (
            <motion.div
              key={piece.id}
              drag
              dragMomentum={false}
              onDragStart={() =>
                dispatch({ type: "DRAG_STARTED", payload: { piece } })
              }
              onDragEnd={() =>
                dispatch({ type: "DRAG_ENDED", payload: { piece } })
              }
              onDrag={(_, info) => {
                const point = {
                  x: Math.min(
                    Math.max(
                      Math.round(
                        (x + info.point.x - (screenSize.width / 2 - 192)) / 48,
                      ),
                      0,
                    ),
                    7,
                  ),
                  y: Math.min(
                    Math.max(
                      Math.round(
                        (y + info.point.y + (screenSize.height / 2 - 192)) / 48,
                      ),
                      0,
                    ),
                    7,
                  ),
                };
                console.log(screenSize);
                console.log(point);
                console.log(info.point);

                if (state.dragging) {
                  const { nextPoint } = state.dragging;
                  if (point.x !== nextPoint.x || point.y !== nextPoint.y) {
                    dispatch({
                      type: "DRAG_MOVED",
                      payload: { piece, point },
                    });
                  }
                }
              }}
              onAnimationComplete={() => dispatch({ type: "ANIMATION_ENDED" })}
              initial={false}
              animate={!isDragging}
              style={{
                position: "absolute",
                top: y,
                left: x,
                border: "1px solid #000",
                backgroundColor: "#efefef",
                fontSize: 10,
                textAlign: "center",
                padding: "12px 12px",
                zIndex: isDragging ? 99 : 1,
              }}
            >
              {piece.name}
            </motion.div>
          );
        })}
      </div>
    </>
  );

  /*
	return (
		<>
			<motion.div className={boardStyle} ref={border}>
				{boardState.squares.map((r: string[], rkey: number) => {
					return r.map((s: string, skey: number) => {
						if (s == "w") {
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
											s.piece.id[0] == "w" || s.piece.id[0] == "b"
												? {
														scale: 1.1,
													}
												: { scale: 1.0 }
										}
										drag={
											s.piece.id[0] == "w" || s.piece.id[0] == "b"
												? true
												: false
										}
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
											s.piece[0] == "w" || s.piece[0] == "b"
												? {
														scale: 1.1,
													}
												: { scale: 1.0 }
										}
										drag={s.piece[0] == "w" || s.piece[0] == "b" ? true : false}
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
		*/
}

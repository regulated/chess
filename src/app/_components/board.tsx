"use client";

import { useReducer, useEffect /*, useRef*/ } from "react";
import { motion } from "framer-motion";
import {
	whiteSquareStyle,
	blackSquareStyle,
	boardStyle,
	wrapper,
} from "../../styles/boardStyles";
import { reducer, initial } from "./reducer";
import Image from "next/image";
// import { bk } from "../../../public";

export function Board() {
	const [state, dispatch] = useReducer(reducer, initial);

	// (view width / 2) - (48 * 4) should be coords of left of board

	useEffect(() => {
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "br0",
					name: "br",
					x: 0,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bn0",
					name: "bn",
					x: 1,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bb0",
					name: "bb",
					x: 2,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bq0",
					name: "bq",
					x: 3,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bk0",
					name: "bk",
					x: 4,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bb1",
					name: "bb",
					x: 5,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bn1",
					name: "bn",
					x: 6,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "br1",
					name: "br",
					x: 7,
					y: 0,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp0",
					name: "bp",
					x: 0,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp1",
					name: "bp",
					x: 1,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp2",
					name: "bp",
					x: 2,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp3",
					name: "bp",
					x: 3,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp4",
					name: "bp",
					x: 4,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp5",
					name: "bp",
					x: 5,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp6",
					name: "bp",
					x: 6,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "bp7",
					name: "bp",
					x: 7,
					y: 1,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp0",
					name: "wp",
					x: 0,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp1",
					name: "wp",
					x: 1,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp2",
					name: "wp",
					x: 2,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp3",
					name: "wp",
					x: 3,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp4",
					name: "wp",
					x: 4,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp5",
					name: "wp",
					x: 5,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp6",
					name: "wp",
					x: 6,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wp7",
					name: "wp",
					x: 7,
					y: 6,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wr0",
					name: "wr",
					x: 0,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wn0",
					name: "wn",
					x: 1,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wb0",
					name: "wb",
					x: 2,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wq0",
					name: "wq",
					x: 3,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wk0",
					name: "wk",
					x: 4,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wb1",
					name: "wb",
					x: 5,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wn1",
					name: "wn",
					x: 6,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
		dispatch({
			type: "ADD_PIECE",
			payload: {
				piece: {
					id: "wr1",
					name: "wr",
					x: 7,
					y: 7,
					xOffset: 0,
					yOffset: 0,
					moved: false,
				},
			},
		});
	}, []);

	const draggingPiece = state.pieces.find((p) => p.id === state.dragging?.id);

	return (
		<>
			<div className={wrapper}>
				<div className={boardStyle}>
					{state.squares.map((row: string[], y: number) => {
						return row.map((square: string, x: number) => {
							return (
								<div
									className={`${(x + y) % 2 == 0 ? whiteSquareStyle : blackSquareStyle
										}`}
									key={`${y}_${x}`}
								>
									{x + " " + y}
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
								x: state.dragging.initialPoint.x * 48,
								y: state.dragging.initialPoint.y * 48,
								width: 48,
								height: 48,
								borderRadius: "6px",
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
								x: state.dragging.nextPoint.x * 48,
								y: state.dragging.nextPoint.y * 48,
								width: 48,
								height: 48,
								borderRadius: "6px",
							}}
						/>
					</>
				)}
				{state.pieces.map((piece) => {
					const x = piece.x * 48 - piece.xOffset; // + 6;
					const y = piece.y * 48 - piece.yOffset; // + 6;
					const isDragging = piece.id === state.dragging?.id;
					// console.log(state);
					return (
						<motion.img
							src={`/${piece.name}.png`}
							key={piece.id}
							drag/*={
								(state.whiteTurn && piece.name.charAt(0) === "w") ||
								(!state.whiteTurn && piece.name.charAt(0) === "b")
							}*/
							dragMomentum={false}
							whileHover={{ scale: 1.1 }}
							onDragStart={() =>
								dispatch({ type: "DRAG_STARTED", payload: { piece } })
							}
							onDragEnd={(_, info) => {
								const offset = {
									x: info.offset.x,
									y: info.offset.y,
								};
								dispatch({ type: "DRAG_ENDED", payload: { piece, offset } });
							}}
							onDrag={(_, info) => {
								const point = {
									x: Math.min(
										Math.max(Math.round((info.point.x - 24) / 48), 0),
										7,
									),
									y: Math.min(
										Math.max(Math.round((info.point.y - 24) / 48), 0),
										7,
									),
								};

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
								height: 48,
								width: 48,
								zIndex: isDragging ? 99 : 1,
							}}
						></motion.img>
					);
				})}
			</div>
		</>
	);
}

"use client";

import { useReducer, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { motion, useDragControls, useAnimationControls } from "framer-motion";
import {
	whiteSquareStyle,
	blackSquareStyle,
	boardStyle,
	wrapper,
	footer,
	evalWrapper,
	evalBar,
} from "../../styles/boardStyles";
import { reducer, initial } from "./reducer";
import useScreenSize from "./useScreenSize";
import type { Piece, Point, Res } from "./types";
import { format } from "./format";

export function Board() {
	const [state, dispatch] = useReducer(reducer, initial);
	//const [states, setStates] = useState<Board[]>([]);

	const [clear, setClear] = useState(false);

	useEffect(() => {
	
		dispatch({ type: "CLEAR_BOARD" });
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
					firstMove: true,
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
		 			firstMove: true,
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
		 			firstMove: true,
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
		 			firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
					firstMove: true,
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
		 			firstMove: true,
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
		 			firstMove: true,
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
		 			firstMove: true,
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
					firstMove: true,
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
		 			firstMove: true,
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
		 			firstMove: true,
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
					firstMove: true,
				},
			},
		});
	}, [clear]);

	const windowOffsetX = useScreenSize().width / 2 - 192;
	const windowOffsetY = useScreenSize().height / 2 - 192;

	const draggingPiece = state.pieces.find((p) => p.id === state.dragging?.id);

	const [tapped, setTapped] = useState(false);
	const [tappedPiece, setTappedPiece] = useState<Piece>();
	const [evl, setEvl] = useState<string>('0');
	const [move, setMove] = useState<string>('');
	// const [mateIn, setMateIn] = useState(0);
	const [whiteMate, setWhiteMate] = useState(0);

	const dragControls = useDragControls();
  const animationControls = useAnimationControls();

	const onReset = () => {
		animationControls.set({
			x: 0,
			y: 0,
		})
	}

	useEffect(() => {

		if (format(state) === '8/8/8/8/8/8/8/8 w KQkq - 0 1') return;
		console.log(format(state));

		async function fetchData(): Promise<void> {
			try {
				const fen = format(state);
				const response = await fetch(
					'https://stockfish.online/api/s/v2.php?fen=' + fen + '&depth=12');

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const data: Res = await response.json();

				console.log(data);

				if (data.evaluation !== undefined) setEvl(data.evaluation);
				if (data.bestmove !== undefined) setMove(data.bestmove.slice(9, 14));
				if (data.mate !== undefined && data.mate !== null) setWhiteMate(data.mate);
				else setWhiteMate(0);

			} catch (error) {
				// Handle any errors here
				console.error('There has been a problem with your fetch operation:', error);
				setEvl('');
				setMove('');
				setWhiteMate(0);
			}
		}

		fetchData()
			.catch((error) => {console.log(error)}); 
	}, [state.whiteTurn])

	// useEffect(() => {
	// 	setStates(state)		
	// }, [state.whiteTurn])

	return (
		<>
			<div className={wrapper}>
				<div className={boardStyle}>
					{state.squares.map((row: string[], y: number) => {
						return row.map((_, x: number) => {
							return (
								<motion.div
									className={`${(x + y) % 2 == 0 ? whiteSquareStyle : blackSquareStyle
										}`}
									key={`${y}_${x}`}
								></motion.div>
							);
						});
					})}
				</div>
				<div className={boardStyle}>
					{state.squares.map((row: string[], y: number) => {
						return row.map((_, x: number) => {
							return (
								<motion.div
									style={
										tapped && state.validSquares[y][x]
											? {
												border: "1px solid #000",
												backgroundColor: "rgb(152, 195, 121)",
												width: 48,
												height: 48,
												borderRadius: "6px",
											}
											: {
												width: 48,
												height: 48,
												borderRadius: "6px",
											}
									}
									onTap={() => {
										const point: Point = { x, y };
										const piece = state.pieces.find(
											(p) => p.id === tappedPiece?.id,
										);
										if (state.validSquares[y][x] && piece) {
											dispatch({
												type: "MOVE_PIECE",
												payload: { piece, point },
											});
											dispatch({ type: "CLEAR_TAP" });
											setTapped(false);
											dispatch({ type: "CHECKMATE" });
										}
									}}
									key={`${y}_${x}`}
								></motion.div>
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
								x: state.dragging.initialPoint.x * 48 + windowOffsetX,
								y: state.dragging.initialPoint.y * 48 + windowOffsetY,
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
								x: state.dragging.nextPoint.x * 48 + windowOffsetX,
								y: state.dragging.nextPoint.y * 48 + windowOffsetY,
								width: 48,
								height: 48,
								borderRadius: "6px",
								zIndex: 10,
							}}
						/>
					</>
				)}
				{state.pieces.map((piece) => {
					const x = piece.x * 48 - piece.xOffset + windowOffsetX;
					const y = piece.y * 48 - piece.yOffset + windowOffsetY;
					const isDragging = piece.id === state.dragging?.id;
					return (
						<motion.img
							id={piece.id}
							src={`/${piece.name}.png`}
							key={piece.id}
							drag={
								(state.whiteTurn && piece.name.startsWith("w")) ||
								(!state.whiteTurn && piece.name.startsWith("b"))
							}
							dragControls={dragControls}
							animate={animationControls}
							dragMomentum={false}
							whileHover={{ scale: 1.3 }}
							onTap={() => {
								const capturedPoint: Point = { x: piece.x, y: piece.y };
								const capturingPiece = state.pieces.find(
									(p) => p.id === tappedPiece?.id,
								);
								// piece tapped to move
								if (
									!isDragging &&
									((state.whiteTurn && piece.name.startsWith("w")) ||
									(!state.whiteTurn && piece.name.startsWith("b")))
								) {
									dispatch({ type: "CLEAR_TAP" });
									setTapped(true);
									setTappedPiece(piece);
									dispatch({ type: "TAP_PIECE", payload: { piece } });
								}
								// piece tapped to capture
								else if (
									!isDragging &&
									tapped &&
									state.validSquares[piece.y][piece.x] &&
									capturingPiece &&
									((state.whiteTurn && piece.name.startsWith("b")) ||
										(!state.whiteTurn && piece.name.startsWith("w")))
								) {
									dispatch({ type: "CLEAR_TAP" });
									setTapped(false);
									dispatch({
										type: "MOVE_PIECE",
										payload: { piece: capturingPiece, point: capturedPoint },
									});
								} else {
									dispatch({ type: "CLEAR_TAP" });
									setTapped(false);
								}
							}}
							onDragStart={() => {
								setTapped(false);
								dispatch({ type: "CLEAR_TAP" });
								dispatch({ type: "DRAG_STARTED", payload: { piece } });
							}}
							onDragEnd={(_, info) => {
								const offset = {
									x: info.offset.x,
									y: info.offset.y,
								};
								setTapped(false);
								dispatch({ type: "CLEAR_TAP" });
								dispatch({ type: "DRAG_ENDED", payload: { piece, offset } });
								dispatch({ type: "CHECKMATE" });
							}}
							onDrag={(_, info) => {
								const point = {
									x: Math.min(
										Math.max(
											Math.round((info.point.x - 24 - windowOffsetX) / 48),
											0,
										),
										7,
									),
									y: Math.min(
										Math.max(
											Math.round((info.point.y - 24 - windowOffsetY) / 48),
											0,
										),
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
							onAnimationComplete={() => {
								dispatch({ type: "ANIMATION_ENDED" });
								// console.log(state);
								// console.log(format(state));
							}}
							initial={false}
							// animate={!isDragging}
							style={{
								position: "absolute",
								top: y,
								left: x,
								height: 48,
								width: 48,
								zIndex: isDragging ? 99 : 11,
							}}
						></motion.img>
					);
				})}
				{//<div className="absolute -mt-10 ml-12 w-24 grid place-items-center gap-6 grid-cols-3">
				// was working on the outside of the div, trying to move it inside the wrapper now
			}
				<div className={footer}>
					<Button
						color="primary"
						onClick={() => {
							onReset();
							setClear(!clear);
						}}
					>
						Reset
					</Button>
					<p className="text-white">
						Best Move: {move}
					</p>
					<p className="text-white">
					Eval: {evl}
					</p>
				</div>
				<div className={evalWrapper}>
					<div className={evalBar}>
						<div style={{
							height: (whiteMate === 0) ? 
								Math.min(Math.max((192 - (Number(evl) * 19)), 0), 384) : 
								((whiteMate < 0) ? 384 : 0),
							backgroundColor: "black",
						}}>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

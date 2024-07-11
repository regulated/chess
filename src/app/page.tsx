import { Board } from "~/app/_components/board";

export default async function Home() {
	return (
		<>
			<div className="m-0 box-border bg-slate-700 p-0">
				<Board />
			</div>
		</>
	);
}

// container flex min-h-screen min-w-full items-center justify-center  bg-slate-900

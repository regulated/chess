import { Board } from "~/app/_components/board";
import { Lichess } from "~/app/_components/lichess";

export default async function Page() {
	return (
		<>
			<div className="m-0 box-border bg-slate-900 p-0">
				<div className="text-white">here</div>
				<Lichess />
			</div>
		</>
	);
}

// container flex min-h-screen min-w-full items-center justify-center  bg-slate-900

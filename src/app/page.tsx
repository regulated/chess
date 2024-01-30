import { Board } from "~/app/_components/board";

export default async function Home() {
  return (
    <>
      <div className="container flex min-h-screen min-w-full items-center justify-center  bg-slate-900">
        <Board />
      </div>
    </>
  );
}

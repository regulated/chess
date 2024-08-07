"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

import { Equine } from "equine";

export default async function Lichess() {
	const lichess = new Equine("LICHESS_API_TOKEN");

	// Returns the info of the account who owns the token
	// const accountInfo = await lichess.account.info();

	// old post
	const router = useRouter();
	const [name, setName] = useState("");

	const createPost = api.post.create.useMutation({
		onSuccess: () => {
			router.refresh();
			setName("");
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				createPost.mutate({ name });
			}}
			className="flex flex-col gap-2"
		>
			<input
				type="text"
				placeholder="Title"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="w-full rounded-full px-4 py-2 text-black"
			/>
			<button
				type="submit"
				className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
				disabled={createPost.isLoading}
			>
				{createPost.isLoading ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
}

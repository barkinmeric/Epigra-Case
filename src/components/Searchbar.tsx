"use client";

import { useRouter } from "next/navigation";

const Searchbar = () => {
	const router = useRouter();

	return (
		<div className="m-8 flex justify-center">
			<input
				type="text"
				placeholder="Search for a character"
				onChange={(e) => router.push(e.target.value ? "/characters?search=" + e.target.value : "/characters")}
				className="w-1/2 rounded-md border-2 border-gray-300 p-2 text-black focus:border-gray-500 focus:outline-none"
			/>
		</div>
	);
};

export default Searchbar;

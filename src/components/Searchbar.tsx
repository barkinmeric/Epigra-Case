"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Searchbar = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const gender = searchParams.get("gender") ? searchParams.get("gender") : "";
	const status = searchParams.get("status") ? searchParams.get("status") : "";
	const page = 1;
	const species = searchParams.get("species") ? searchParams.get("species") : "";

	return (
		<div className="m-8 flex justify-center">
			<input
				type="text"
				placeholder="Search for a character"
				onChange={(e) =>
					router.push(
						"/characters?" +
							"search=" +
							e.target.value +
							"&gender=" +
							gender +
							"&status=" +
							status +
							"&page=" +
							page +
							"&species=" +
							species,
					)
				}
				className="w-full rounded-md border-2 border-gray-300 p-2 text-black focus:border-gray-500 focus:outline-none sm:w-1/2"
			/>
		</div>
	);
};

export default Searchbar;

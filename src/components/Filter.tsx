"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const search = searchParams.get("search") ? searchParams.get("search") : "";
	const gender = searchParams.get("gender") ? searchParams.get("gender") : "";
	const status = searchParams.get("status") ? searchParams.get("status") : "";
	const page = 1;
	const species = searchParams.get("species") ? searchParams.get("species") : "";

	return (
		<div className="m-8 flex justify-center">
			<div className="mx-2 flex w-32 flex-col text-center">
				<p>Status</p>
				<select
					name="status"
					id="status"
					value={searchParams.get("status") || ""}
					className=" rounded-md border-2 border-gray-300 bg-black p-2 text-white  focus:border-gray-500 focus:outline-none"
					onChange={(e) => {
						router.push(
							"/characters?" +
								"search=" +
								search +
								"&gender=" +
								gender +
								"&status=" +
								e.target.value +
								"&page=" +
								page +
								"&species=" +
								species,
						);
					}}
				>
					<option value="">All</option>
					<option value="alive">Alive</option>
					<option value="dead">Dead</option>
					<option value="unknown">Unknown</option>
				</select>
			</div>

			<div className="mx-2 flex w-32 flex-col text-center">
				<p>Species</p>
				<select
					name="species"
					id="species"
					value={searchParams.get("species") || ""}
					className=" rounded-md border-2 border-gray-300 bg-black p-2 text-white  focus:border-gray-500 focus:outline-none"
					onChange={(e) => {
						router.push(
							"/characters?" +
								"search=" +
								search +
								"&gender=" +
								gender +
								"&status=" +
								status +
								"&page=" +
								page +
								"&species=" +
								e.target.value,
						);
					}}
				>
					<option value="">All</option>
					<option value="alien">Alien</option>
					<option value="animal">Animal</option>
					<option value="cronenberg">Cronenberg</option>
					<option value="disease">Disease</option>
					<option value="human">Human</option>
					<option value="humanoid">Humanoid</option>
					<option value="mythological">Mythological</option>
					<option value="planet">Planet</option>
					<option value="poopybutthole">Poopybutthole</option>
					<option value="robot">Robot</option>
					<option value="unknown">Unknown</option>
				</select>
			</div>

			<div className="mx-2 flex w-32 flex-col text-center">
				<p>Gender</p>
				<select
					name="gender"
					id="gender"
					value={searchParams.get("gender") || ""}
					className="rounded-md border-2 border-gray-300 bg-black p-2 text-white  focus:border-gray-500 focus:outline-none"
					onChange={(e) => {
						router.push(
							"/characters?" +
								"search=" +
								search +
								"&gender=" +
								e.target.value +
								"&status=" +
								status +
								"&page=" +
								page +
								"&species=" +
								species,
						);
					}}
				>
					<option value="">All</option>
					<option value="female">Female</option>
					<option value="male">Male</option>
					<option value="genderless">Genderless</option>
					<option value="unknown">Unknown</option>
				</select>
			</div>
		</div>
	);
};

export default Filter;

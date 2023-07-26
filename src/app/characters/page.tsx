import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import Link from "next/link";
import Card from "@/components/Card";
import Searchbar from "@/components/Searchbar";
import Filter from "@/components/Filter";

interface Character {
	id: string;
	image: string;
	name: string;
	status: string;
	location: {
		name: string;
	};
}

function getCharacters(page: number, search: string, gender: string, status: string, species: string) {
	const query = gql`
		query Query {
			characters(page: ${page}, filter: { name: "${search}", gender:"${gender}", status:"${status}", species:"${species}"}) {
				info {
					pages
					next
					prev
				}
				results {
					name
					id
					status
					image
				}
			}
		}
	`;
	return query;
}

export default async function Characters({
	searchParams,
}: {
	searchParams: { page: number; search: string; gender: string; status: string; species: string };
}) {
	if (!searchParams.page) searchParams.page = 1;
	if (!searchParams.search) searchParams.search = "";
	if (!searchParams.gender) searchParams.gender = "";
	if (!searchParams.status) searchParams.status = "";
	if (!searchParams.species) searchParams.species = "";

	const query = getCharacters(searchParams.page, searchParams.search, searchParams.gender, searchParams.status, searchParams.species);
	const { data } = await getClient().query({
		query,
	});

	return (
		<main className=" mx-auto max-w-6xl px-5">
			<Searchbar />
			<Filter />
			<div className="grid grid-cols-2 gap-8 sm:grid-cols-4 ">
				{data.characters.results.map((character: Character) => (
					<Card character={character} key={character.id} />
				))}
			</div>
			<div className="flex justify-center gap-12 p-4">
				{data.characters.info.prev ? (
					<Link
						href={{
							pathname: "/characters",
							query: {
								search: searchParams.search ? searchParams.search : "",
								gender: searchParams.gender ? searchParams.gender : "",
								status: searchParams.status ? searchParams.status : "",
								page: data.characters.info.prev,
								species: searchParams.species ? searchParams.species : "",
							},
						}}
					>
						Prev
					</Link>
				) : null}
				{data.characters.info.next ? (
					<Link
						href={{
							pathname: "/characters",
							query: {
								search: searchParams.search ? searchParams.search : "",
								gender: searchParams.gender ? searchParams.gender : "",
								status: searchParams.status ? searchParams.status : "",
								page: data.characters.info.next,
								species: searchParams.species ? searchParams.species : "",
							},
						}}
					>
						Next
					</Link>
				) : null}
			</div>
		</main>
	);
}

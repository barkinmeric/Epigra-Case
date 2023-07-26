import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import Link from "next/link";
import Card from "@/components/Card";
import Searchbar from "@/components/Searchbar";

interface Character {
	id: string;
	image: string;
	name: string;
	status: string;
	location: {
		name: string;
	};
}

function getCharacters(page: number, search: string) {
	const query = gql`
		query Query {
			characters(page: ${page}, filter: { name: "${search}" }) {
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

export default async function Characters({ searchParams }: { searchParams: { page: number; search: string } }) {
	if (!searchParams.page) searchParams.page = 1;
	if (!searchParams.search) searchParams.search = "";
	const query = getCharacters(searchParams.page, searchParams.search);
	const { data } = await getClient().query({
		query,
	});

	return (
		<main className=" mx-auto max-w-6xl px-5">
			<Searchbar />
			<div className="grid grid-cols-2 gap-8 sm:grid-cols-4 ">
				{data.characters.results.map((character: Character) => (
					<Card character={character} key={character.id} />
				))}
			</div>
			<div className="flex justify-center gap-12 p-4">
				{data.characters.info.prev ? <Link href={{ pathname: "/characters", query: { page: data.characters.info.prev } }}>Prev</Link> : null}
				{data.characters.info.next ? <Link href={{ pathname: "/characters", query: { page: data.characters.info.next } }}>Next</Link> : null}
			</div>
		</main>
	);
}

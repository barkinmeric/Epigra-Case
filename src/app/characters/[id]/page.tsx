import Image from "next/image";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

interface Episode {
	id: string;
	name: string;
	episode: string;
	air_date: string;
}

interface Character {
	id: string;
	image: string;
	name: string;
	status: string;
	location: {
		name: string;
	};
	episode: Episode;
}

function getCharacter(id: number) {
	const query = gql`
		query Query{
			character(id: ${id}) {
				name
				id
				image
				status
				species
				gender
				origin{
					name
				}
				location {
					name
				}
				episode {
					air_date
					episode
					name
					id
				}
			}
		}
	`;
	return query;
}

export default async function Character({ params }: { params: { id: number } }) {
	const query = getCharacter(params.id);
	const { data } = await getClient().query({
		query,
	});
	const character = data.character;

	return (
		<main className=" mx-auto max-w-6xl px-5">
			<div className=" flex flex-col justify-center p-3 text-center">
				<div className=" my-3 text-4xl font-bold">{character.name}</div>
				<Image className="mx-auto rounded-md" src={character.image} alt={character.name} height={320} width={320} />

				<div
					className={
						"mx-auto my-4 w-80 rounded-sm p-1 text-sm font-bold text-white" +
						(character.status === "Dead" ? " bg-red-500" : character.status === "Alive" ? " bg-green-500" : " bg-yellow-500")
					}
				>
					{character.status}
				</div>

				<div className="mx-auto flex w-80 flex-col gap-2 text-left">
					<div className="flex flex-row gap-2">
						<div className="font-bold">Species:</div>
						<div>{character.species}</div>
					</div>
					<div className="flex flex-row gap-2">
						<div className="font-bold">Gender:</div>
						<div>{character.gender}</div>
					</div>
					<div className="flex flex-row gap-2">
						<div className="font-bold">Location:</div>
						<div>{character.location.name}</div>
					</div>
					<div className="flex flex-row gap-2">
						<div className="font-bold">Origin:</div>
						<div>{character.origin.name}</div>
					</div>
				</div>
				<div className="mx-auto mt-16 flex flex-col gap-2 text-left">
					<div className="font-bold">Episodes:</div>
					{character.episode.map((episode: Episode) => (
						<div key={episode.id}>
							{episode.episode}. {episode.name} - {episode.air_date}
						</div>
					))}
				</div>
			</div>
		</main>
	);
}

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
	character: {
		id: string;
		image: string;
		name: string;
		status: string;
		location: {
			name: string;
		};
	};
}

const Card = ({ character }: CardProps) => {
	if (character) {
		return (
			<Link href={"/characters/" + character.id} className="relative mb-4 overflow-hidden rounded-md bg-white text-black no-underline">
				<div className=" flex flex-col justify-center ">
					<Image className="rounded-sm" src={character.image} alt={character.name} height={320} width={320} />
					<div className="p-3">
						<div className=" mb-3 font-bold">{character.name}</div>
					</div>
				</div>

				<div
					className={
						"absolute left-1 top-1 rounded-sm p-1 text-sm font-bold text-white" +
						(character.status === "Dead" ? " bg-red-500" : character.status === "Alive" ? " bg-green-500" : " bg-yellow-500")
					}
				>
					{character.status}
				</div>
			</Link>
		);
	}
	return <p>No Characters Found!</p>;
};

export default Card;

import Rarities from "@core/Common/Rarities";

export type CreatePokemonDto = {
	name: string;
	hp: number;
	firstEdition: boolean;
	rarity: Rarities;
	price: number;
	image: string;
	expansionId: number;
	typeId: number;
}

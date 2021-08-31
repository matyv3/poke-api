import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";
import Pokemon from "@core/Pokemons/domain/Pokemon";
import { CreatePokemonDto } from "./CreatePokemonDto";

export default class CreatePokemon {

	constructor(
		private repository: IPokemonRepository
	){ }
	

	public async run(data: CreatePokemonDto): Promise<Pokemon>{

		const pokemon = new Pokemon(
			data.name,
			data.hp,
			data.firstEdition,
			data.expansion,
			data.type,
			data.rarity,
			data.price,
			data.image
		)

		//this.repository.create(pokemon)
		console.log('pokemon dataaaa: ', data)

		return pokemon
	}

}

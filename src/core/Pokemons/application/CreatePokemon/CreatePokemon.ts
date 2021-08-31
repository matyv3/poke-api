import Expansion from "@core/Pokemons/domain/Expansion";
import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";
import Pokemon from "@core/Pokemons/domain/Pokemon";
import PokemonType from "@core/Pokemons/domain/PokemonType";
import { CreatePokemonDto } from "./CreatePokemonDto";

export default class CreatePokemon {

	constructor(
		private repository: IPokemonRepository
	){ }
	

	public async run(data: CreatePokemonDto): Promise<Pokemon>{

		// validate expansion, type, rarity
		//const expansion = new Expansion('test')
		//const type = new PokemonType('type')

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

		//await this.repository.create(pokemon)
		console.log('pokemon: ', data)

		return pokemon
	}

}

import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";
import Pokemon from "@core/Pokemons/domain/Pokemon";
import { CreatePokemonDto } from "../CreatePokemon/CreatePokemonDto";


export default class UpdatePokemon {

	constructor(
		private repository: IPokemonRepository
	){}

	public async run(id: number, data: Partial<CreatePokemonDto>): Promise<Pokemon>{
		throw new Error('method not implemented')
	}
}

import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";
import { PokemonQuery } from '@core/Pokemons/domain/IPokemonRepository'

export default class GetPokemons {

	constructor(
		private repository: IPokemonRepository
	){}

	public async run(params?: PokemonQuery){

		return await this.repository.find(params)
	}
}

import HttpException from "@core/Common/HttpException";
import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";
import { PokemonQuery } from '@core/Pokemons/domain/IPokemonRepository'

export default class GetPokemons {

	constructor(
		private repository: IPokemonRepository
	){}

	public async run(params?: PokemonQuery){

		if(params && params.id){
			const pokemon = await this.repository.findOne(params.id)
			if(!pokemon) throw new HttpException(404, 'Pokemon not found')
			return pokemon
		}
		return await this.repository.find(params)
	}
}

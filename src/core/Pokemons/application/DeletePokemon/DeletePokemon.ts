import HttpException from "@core/Common/HttpException";
import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";

export default class DeletePokemon {

	constructor(
		private repository: IPokemonRepository
	){}

	public async run(id: number): Promise<boolean>{

		const pokemon = await this.repository.findOne(id)
		if(!pokemon) throw new HttpException(404, 'Pokemon not found');

		return await this.repository.delete(id)
	}
}

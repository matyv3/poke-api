import HttpException from "@core/Common/HttpException";
import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";
import Pokemon from "@core/Pokemons/domain/Pokemon";
import { CreatePokemonDto } from "../CreatePokemon/CreatePokemonDto";
import fs from 'fs'
import path from "path";

export default class UpdatePokemon {

	constructor(
		private repository: IPokemonRepository
	){}

	public async run(id: number, data: Partial<CreatePokemonDto>): Promise<Pokemon>{

		const pokemon = await this.repository.findOne(id)
		if(!pokemon) throw new HttpException(404, 'Pokemon not found');

		if(data.expansionId){
			const expansion = await this.repository.getExpansionById(data.expansionId)
			if(!expansion) throw new HttpException(404, 'Expansion not found');
		}

		if(data.typeId){
			const pokemonType = await this.repository.getExpansionById(data.typeId)
			if(!pokemonType) throw new HttpException(404, 'Pokemon type not found');
		}

		if(data.image && fs.existsSync(path.join(__dirname, '../../../../../' + pokemon.image))){
		  fs.unlinkSync(path.join(__dirname, '../../../../../' + pokemon.image))
		}

		return await this.repository.update(id, data)
	}
}

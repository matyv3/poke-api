import HttpException from "@core/Common/HttpException";
import Rarities from "@core/Common/Rarities";
import IPokemonRepository from "@core/Pokemons/domain/IPokemonRepository";
import Pokemon from "@core/Pokemons/domain/Pokemon";
import { CreatePokemonDto } from "./CreatePokemonDto";

export default class CreatePokemon {

	constructor(
		private repository: IPokemonRepository
	){ }
	

	public async run(data: CreatePokemonDto): Promise<Pokemon>{

		if(!Object.values(Rarities).includes(data.rarity)){
			throw new HttpException(400, "Invalid rarity")
		}

		const expansion = await this.repository.getExpansionById(data.expansionId)
		if(!expansion) throw new HttpException(404, 'Expansion not found');

		const pokemonType = await this.repository.getTypeById(data.typeId)
		if(!pokemonType) throw new HttpException(404, 'Pokemon type not found');

		if(typeof data.firstEdition == 'string'){
			data.firstEdition = data.firstEdition == 'true' ? true : false
		}

		const pokemon = new Pokemon(
			data.name,
			data.hp,
			data.firstEdition,
			expansion,
			pokemonType,
			data.rarity,
			data.price,
			data.image
		)

		return await this.repository.create(pokemon)
	}

}

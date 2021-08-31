import TYPES from "@config/types";
import { inject, injectable } from "inversify";
import CreatePokemon from "./application/CreatePokemon/CreatePokemon";
import { CreatePokemonDto } from "./application/CreatePokemon/CreatePokemonDto";
import IPokemonRepository from "./domain/IPokemonRepository";
import Pokemon from "./domain/Pokemon";

@injectable()
export default class PokemonService {

	constructor(
		@inject(TYPES.PokemonRepository) private repository: IPokemonRepository
	){}

	public async create(data: CreatePokemonDto): Promise<Pokemon> {
		return await new CreatePokemon(this.repository).run(data)
	}
}

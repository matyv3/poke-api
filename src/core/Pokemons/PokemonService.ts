import TYPES from "@config/types";
import { inject, injectable } from "inversify";
import CreatePokemon from "./application/CreatePokemon/CreatePokemon";
import { CreatePokemonDto } from "./application/CreatePokemon/CreatePokemonDto";
import GetPokemons from "./application/GetPokemons/GetPokemons";
import UpdatePokemon from "./application/UpdatePokemon/UpdatePokemon";
import Expansion from "./domain/Expansion";
import IPokemonRepository, { PokemonQuery } from "./domain/IPokemonRepository";
import Pokemon from "./domain/Pokemon";
import PokemonType from "./domain/PokemonType";

@injectable()
export default class PokemonService {

	constructor(
		@inject(TYPES.PokemonRepository) private repository: IPokemonRepository
	){}

	public async create(data: CreatePokemonDto): Promise<Pokemon> {
		return await new CreatePokemon(this.repository).run(data)
	}

	public async find(query?: PokemonQuery): Promise<{ data: Pokemon[], total: number } | Pokemon> {
		return await new GetPokemons(this.repository).run(query)
	}
	
	public async update(id: number, data: Partial<CreatePokemonDto>): Promise<Pokemon> {
		return new UpdatePokemon(this.repository).run(id, data)
	}

	public async delete(id: number): Promise<boolean> {
		return await this.repository.delete(id)
	}

	public async getExpansions(): Promise<Expansion[]>{
		return await this.repository.getExpansions()
	}

	public async getTypes(): Promise<PokemonType[]>{
		return await this.repository.getTypes()
	}
}

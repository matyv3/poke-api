import { injectable } from "inversify";
import { CreatePokemonDto } from "../application/CreatePokemon/CreatePokemonDto";
import IPokemonRepository from "../domain/IPokemonRepository";
import Pokemon from "../domain/Pokemon";

@injectable()
export default class PokemonRepository implements IPokemonRepository {

	constructor(){}

	public async create(data: CreatePokemonDto): Promise<Pokemon> {
		throw new Error('method not implemented')
	}

	public async update(id: number, data: Partial<Pokemon>): Promise<Pokemon> {
		throw new Error('method not implemented')
	}
	
	public async delete(id: number): Promise<boolean> {
		throw new Error('method not implemented')
	}

	public async find(): Promise<Pokemon[]> {
		throw new Error('method not implemented')
	}
}

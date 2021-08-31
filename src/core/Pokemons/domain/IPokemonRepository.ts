import Expansion from "./Expansion";
import Pokemon from "./Pokemon";
import PokemonType from "./PokemonType";

export type PokemonQuery = {
	limit?: number;
	offset?: number;
}

export default interface IPokemonRepository {

	create(pokemon: Pokemon): Promise<Pokemon>
	update(id: number, data: Partial<Pokemon>): Promise<Pokemon>
	delete(id: number): Promise<boolean>
	find(params?: PokemonQuery): Promise<{ data: Pokemon[], total: number }>

	getExpansions(): Promise<Expansion[]>
	getExpansionById(id: number): Promise<Expansion|undefined> 
	getTypes(): Promise<PokemonType[]>
	getTypeById(id: number): Promise<PokemonType|undefined> 
}

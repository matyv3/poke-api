import Pokemon from "./Pokemon";

export default interface IPokemonRepository {

	create(pokemon: Pokemon): Promise<Pokemon>
	update(id: number, data: Partial<Pokemon>): Promise<Pokemon>
	delete(id: number): Promise<boolean>
	find(): Promise<Pokemon[]>
}

import { injectable } from "inversify";
import { FindManyOptions, getRepository } from "typeorm";
import Expansion from "../domain/Expansion";
import IPokemonRepository, { PokemonQuery } from "../domain/IPokemonRepository";
import Pokemon from "../domain/Pokemon";
import PokemonType from "../domain/PokemonType";

@injectable()
export default class PokemonRepository implements IPokemonRepository {


	public async create(data: Pokemon): Promise<Pokemon> {
		const repo = getRepository(Pokemon);
		return await repo.save(data)
	}

	public async update(id: number, data: Partial<Pokemon>): Promise<Pokemon> {
		const repo = getRepository(Pokemon);
		let update = { id };
		Object.keys(data).forEach((key) => {
			update[key] = data[key];
		});
		return await repo.save(update)
	}
	
	public async delete(id: number): Promise<boolean> {
		const repo = getRepository(Pokemon);
		const result =  await repo.delete(id)
		return result ? true : false
	}

	public async find(params?: PokemonQuery): Promise<{ data: Pokemon[], total: number }> {
		const repo = getRepository(Pokemon);

		const query: FindManyOptions<Pokemon> = {
			take: params && params.limit ? params.limit : 10
		};
		if(params && params.offset) query.skip = params.offset;

		const [result, total] = await repo.findAndCount(query)
		return {
			data: result,
			total
		}
	}

	public async findOne(id: number): Promise<Pokemon|undefined> {
		const repo = getRepository(Pokemon);
		return await repo.findOne(id)
	}

	public async getExpansions(): Promise<Expansion[]> {
		const expansionRepository = getRepository(Expansion);
		return await expansionRepository.find()
	}

	public async getExpansionById(id: number): Promise<Expansion|undefined> {
		const expansionRepository = getRepository(Expansion);
		return await expansionRepository.findOne(id)
	}
	
	public async getTypes(): Promise<PokemonType[]> {
		const typesRepository = getRepository(PokemonType);
		return await typesRepository.find()
	}

	public async getTypeById(id: number): Promise<PokemonType|undefined> {
		const typesRepository = getRepository(PokemonType);
		return await typesRepository.findOne(id)
	}

}

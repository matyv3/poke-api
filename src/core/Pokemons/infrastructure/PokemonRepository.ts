import { injectable } from "inversify";
import { FindManyOptions, getRepository, Like } from "typeorm";
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

		const where: any = {}
		const query: FindManyOptions<Pokemon> = {
			join: {
				alias: "pokemons",
				leftJoinAndSelect: {
					type: "pokemons.type",
					expansion: "pokemons.expansion",
				}
			},
			take: params && params.limit ? params.limit : 10,
		};

		if(params?.offset) query.skip = params.offset;
		if(params?.rarity) where.rarity = params.rarity
		if(params?.expansion_id) where.expansion = params.expansion_id
		if(params?.type_id) where.type = params.type_id
		if(params?.name) where.name = Like(`%${params.name}%`)
		query.where = where

		const [result, total] = await repo.findAndCount(query)
		return {
			data: result,
			total
		}
	}

	public async findOne(id: number): Promise<Pokemon|undefined> {
		const repo = getRepository(Pokemon);
		return await repo.findOne(id, {
			join: {
				alias: "pokemons",
				leftJoinAndSelect: {
					type: "pokemons.type",
					expansion: "pokemons.expansion",
				}
			},
		})
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

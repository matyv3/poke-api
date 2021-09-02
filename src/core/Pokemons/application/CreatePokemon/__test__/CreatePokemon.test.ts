
import { mock } from 'jest-mock-extended'
import IUserRepository from '../../../domain/IPokemonRepository'
import { CreatePokemonDto } from '../CreatePokemonDto'
import Rarities from "../../../../Common/Rarities";
import CreatePokemon from '../CreatePokemon'
import Pokemon from '../../../domain/Pokemon'
import Expansion from '../../../domain/Expansion';
import PokemonType from '../../../domain/PokemonType';

describe('Create Pokemon tests', () => {
	const repository = mock<IUserRepository>()
	const dto: CreatePokemonDto = {
		name: 'pikachu',
		hp: 1000,
		firstEdition: true,
		rarity: Rarities.Rare,
		price: 99.99,
		image: 'fake/path.png',
		expansionId: 1,
		typeId: 2
	}
	const pokemonMock = mock<Pokemon>()
	const expansionMock = mock<Expansion>()
	const pokemonTypeMock = mock<PokemonType>()
	repository.create.mockReturnValue(Promise.resolve(pokemonMock))

	it('Should create a Pokemon', async () => {
		repository.getExpansionById.mockReturnValue(Promise.resolve(expansionMock))
		repository.getTypeById.mockReturnValue(Promise.resolve(pokemonTypeMock))

		const result = await new CreatePokemon(repository).run(dto)
		expect(result).toMatchObject(pokemonMock)
	})
})

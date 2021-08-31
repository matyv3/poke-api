import IPokemonRepository from '@core/Pokemons/domain/IPokemonRepository';
import PokemonRepository from '@core/Pokemons/infrastructure/PokemonRepository';
import PokemonService from '@core/Pokemons/PokemonService';
import { Container } from 'inversify';
import TYPES from './types'

let container = new Container();

container.bind<IPokemonRepository>(TYPES.PokemonRepository).to(PokemonRepository);
container.bind<PokemonService>(TYPES.PokemonService).to(PokemonService);

export default container


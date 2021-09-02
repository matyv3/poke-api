import IPokemonRepository from '@core/Pokemons/domain/IPokemonRepository';
import PokemonRepository from '@core/Pokemons/infrastructure/PokemonRepository';
import PokemonService from '@core/Pokemons/PokemonService';
import IUserRepository from '@core/Users/domain/IUserRepository';
import UserRepository from '@core/Users/infrastructure/UserRepository';
import UserService from '@core/Users/UserService';
import { Container } from 'inversify';
import TYPES from './types'

let container = new Container();

container.bind<IPokemonRepository>(TYPES.PokemonRepository).to(PokemonRepository);
container.bind<PokemonService>(TYPES.PokemonService).to(PokemonService);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);

export default container


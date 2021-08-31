import errorHandler from "@api/utils/error-handler";
import TYPES from "@config/types";
import { CreatePokemonDto } from "@core/Pokemons/application/CreatePokemon/CreatePokemonDto";
import PokemonService from "@core/Pokemons/PokemonService";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, response, request } from "inversify-express-utils";

@controller("/pokemons")
export class PokemonController extends BaseHttpController {

	constructor(
		@inject(TYPES.PokemonService) private pokemonService: PokemonService
	) {
		super();
	}

  @httpPost('/')
  public async create(@request() req: Request, @response() res: Response){
	  try{
		  const data: CreatePokemonDto = {
			  name: req.body.name,
			  hp: req.body.hp,
			  firstEdition: req.body.firstEdition,
			  expansion: req.body.expansion,
			  type: req.body.type,
			  rarity: req.body.rarity,
			  price: req.body.price,
			  image: ''
		  }
		  
		  const result = await this.pokemonService.create(data)

		  return this.json({ data: result }, 201)
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }
}


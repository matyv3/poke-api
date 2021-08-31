import errorHandler from "@api/utils/error-handler";
import TYPES from "@config/types";
import { CreatePokemonDto } from "@core/Pokemons/application/CreatePokemon/CreatePokemonDto";
import { PokemonQuery } from "@core/Pokemons/domain/IPokemonRepository";
import PokemonService from "@core/Pokemons/PokemonService";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, response, request, httpGet } from "inversify-express-utils";

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
			  expansionId: req.body.expansion_id,
			  typeId: req.body.type_id,
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

  @httpGet('/')
  public async find(@request() req: Request, @response() res: Response){
	  try{
		  const params: PokemonQuery = req.body
		  const data = await this.pokemonService.find(params)
		  return this.json({ data })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }

  @httpGet('/expansions')
  public async expansions(@request() req: Request, @response() res: Response){
	  try{
		  const data = await this.pokemonService.getExpansions()
		  return this.json({ data })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }

  @httpGet('/types')
  public async types(@request() req: Request, @response() res: Response){
	  try{
		  const data = await this.pokemonService.getTypes()
		  return this.json({ data })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }
}


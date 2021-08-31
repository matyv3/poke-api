import errorHandler from "@api/utils/error-handler";
import TYPES from "@config/types";
import { CreatePokemonDto } from "@core/Pokemons/application/CreatePokemon/CreatePokemonDto";
import { PokemonQuery } from "@core/Pokemons/domain/IPokemonRepository";
import PokemonService from "@core/Pokemons/PokemonService";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, response, request, httpGet, httpDelete, httpPut } from "inversify-express-utils";
import { CreatePokemonValidation } from "@api/middlewares/pokemon-middlewares";
import Validate from "@api/utils/request-validator";

@controller("/pokemons")
export class PokemonController extends BaseHttpController {

	constructor(
		@inject(TYPES.PokemonService) private pokemonService: PokemonService
	) {
		super();
	}

  /**
   * @swagger
   * /pokemons:
   *   post:
   *     description: Create Pokemon
   *     tags: [Pokemons]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         in: formData
   *         required: true
   *         type: string
   *       - name: hp
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: first_edition
   *         in: formData
   *         type: boolean
   *       - name: price
   *         in: formData
   *         required: true
   *         type: number
   *       - name: expansion_id
   *         description: id from /pokemons/expansions
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: type_id
   *         description: id from /pokemons/types
   *         in: formData
   *         required: true
   *         type: integer
   *       - name: rarity
   *         in: formData
   *         required: true
   *         type: string
   *         description: default 'common'
   *         enum:
   *            - common
   *            - not_common
   *            - rare
   *     responses:
   *       200:
   *         description: Pokemon
   */
  @httpPost('/', ...CreatePokemonValidation, Validate)
  public async create(@request() req: Request, @response() res: Response){
	  try{
		  const data: CreatePokemonDto = {
			  name: req.body.name,
			  hp: req.body.hp,
			  firstEdition: req.body.first_edition,
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

  /**
   * @swagger
   * /pokemons/{id}:
   *   put:
   *     description: Delete Pokemon
   *     tags: [Pokemons]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: name
   *         in: formData
   *         type: string
   *       - name: hp
   *         in: formData
   *         type: integer
   *       - name: first_edition
   *         in: formData
   *         type: boolean
   *       - name: price
   *         in: formData
   *         type: number
   *       - name: expansion_id
   *         description: id from /pokemons/expansions
   *         in: formData
   *         type: integer
   *       - name: type_id
   *         description: id from /pokemons/types
   *         in: formData
   *         type: integer
   *       - name: rarity
   *         in: formData
   *         type: string
   *         description: default 'common'
   *         enum:
   *            - common
   *            - not_common
   *            - rare
   *     responses:
   *       200:
   *         description: Updated Pokemon
   */
  @httpPut('/:id')
  public async update(@request() req: Request, @response() res: Response){
	  try{
		  const data: Partial<CreatePokemonDto> = {
			  ...req.body
		  }
		  const result = await this.pokemonService.update(parseInt(req.params.id), data)
		  return this.json({ data: result })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }


  /**
   * @swagger
   * /pokemons/{id}:
   *   delete:
   *     description: Delete Pokemon
   *     tags: [Pokemons]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Operation boolean result
   */
  @httpDelete('/:id')
  public async delete(@request() req: Request, @response() res: Response){
	  try{
		  const data = await this.pokemonService.delete(parseInt(req.params.id))
		  return this.json({ data })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }

  /**
   * @swagger
   * /pokemons/expansions:
   *   get:
   *     description: Get pokemons expansions
   *     tags: [Pokemons]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Pokemon expansions
   */
  @httpGet('/expansions')
  public async expansions(@request() req: Request, @response() res: Response){
	  try{
		  const data = await this.pokemonService.getExpansions()
		  return this.json({ data })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }

  /**
   * @swagger
   * /pokemons/types:
   *   get:
   *     description: Get pokemons types
   *     tags: [Pokemons]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Pokemon types
   */
  @httpGet('/types')
  public async types(@request() req: Request, @response() res: Response){
	  try{
		  const data = await this.pokemonService.getTypes()
		  return this.json({ data })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }

  /**
   * @swagger
   * /pokemons/{id}:
   *   get:
   *     description: Get pokemons
   *     tags: [Pokemons]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         type: string
   *       - name: limit
   *         in: query
   *         type: string
   *       - name: integer
   *         in: query
   *         type: integer
   *     responses:
   *       200:
   *         description: Pokemon or array of Pokemons
   */
  @httpGet('/:id?')
  public async find(@request() req: Request, @response() res: Response){
	  try{
		  const params: PokemonQuery = {
			  ...req.query
		  }
		  if(req.params.id){
			  params.id = parseInt(req.params.id)
		  }
		  const data = await this.pokemonService.find(params)
		  return this.json({ data })
	  }catch(err){
		  return errorHandler(err, res)
	  }
  }
}


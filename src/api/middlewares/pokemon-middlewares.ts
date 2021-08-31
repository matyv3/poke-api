import { check } from "express-validator";

export const CreatePokemonValidation = [
	check('name').exists(),
	check('hp').exists().isInt(),
	check('expansion_id').exists().isInt(),
	check('type_id').exists().isInt(),
	check('rarity').exists(),
	check('price').exists().isNumeric(),
]



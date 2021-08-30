import { BaseHttpController, controller, httpPost } from "inversify-express-utils";

@controller("/pokemons")
export class PokemonController extends BaseHttpController {

  constructor() {
    super();
  }

  @httpPost('/')
  public async create(){
	  return this.json({ status: 'ok' }, 201)
  }
}


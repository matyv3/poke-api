import errorHandler from "@api/utils/error-handler";
import TYPES from "@config/types";
import { AuthenticateDto } from "@core/Users/application/Authenticate/AuthenticateDto";
import { CreateUserDto } from "@core/Users/application/CreateUser/CreateUserDto";
import UserService from "@core/Users/UserService";
import { Request, Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, request, response } from "inversify-express-utils";




@controller("/auth")
export class AuthController extends BaseHttpController{

	constructor(
		@inject(TYPES.UserService) private userService: UserService
	) {
		super();
	}

	/**
	 * @swagger
	 * /auth/register:
	 *   post:
	 *     description: Register User
	 *     tags: [Auth]
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: name
	 *         in: formData
	 *         required: true
	 *         type: string
	 *       - name: email
	 *         in: formData
	 *         required: true
	 *         type: string
	 *       - name: password
	 *         in: formData
	 *         required: true
	 *         type: string
	 *     responses:
	 *       200:
	 *         description: User
	 */
	@httpPost('/register')
	public async register(@request() req: Request, @response() res: Response){
		try{
			const data: CreateUserDto = {
				email: req.body.email,
				name: req.body.name,
				password: req.body.password
			}
			const user = await this.userService.createUser(data)
			return this.json({ data: user }, 201)
		}catch(err){
			return errorHandler(err, res)
		}
	}

	/**
	 * @swagger
	 * /auth/login:
	 *   post:
	 *     description: Authenticate User
	 *     tags: [Auth]
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: email
	 *         in: formData
	 *         required: true
	 *         type: string
	 *       - name: password
	 *         in: formData
	 *         required: true
	 *         type: string
	 *     responses:
	 *       200:
	 *         description: User
	 */
	@httpPost('/login')
	public async authenticate(@request() req: Request, @response() res: Response){
		try{
			const data: AuthenticateDto = {
				email: req.body.email,
				password: req.body.password
			}
			const result = await this.userService.authenticate(data)
			return this.json({ data: result }, 200)
		}catch(err){
			return errorHandler(err, res)
		}
	}
}


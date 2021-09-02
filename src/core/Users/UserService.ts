import TYPES from "@config/types";
import { inject, injectable } from "inversify";
import Authenticate from "./application/Authenticate/Authenticate";
import { AuthenticateDto } from "./application/Authenticate/AuthenticateDto";
import { AuthResponseDto } from "./application/Authenticate/AuthResponseDto";
import CreateUser from "./application/CreateUser/CreateUser";
import { CreateUserDto } from "./application/CreateUser/CreateUserDto";
import IUserRepository from "./domain/IUserRepository";
import User from "./domain/User";

@injectable()
export default class UserService {

	constructor(
		@inject(TYPES.UserRepository) private repository: IUserRepository
	){}

	public async authenticate(data: AuthenticateDto): Promise<AuthResponseDto> {
		return await new Authenticate(this.repository).run(data)
	}

	public async createUser(data: CreateUserDto): Promise<User> {
		return await new CreateUser(this.repository).run(data)
	}
}

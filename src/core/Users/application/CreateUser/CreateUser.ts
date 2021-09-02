import HttpException from "@core/Common/HttpException";
import IUserRepository from "@core/Users/domain/IUserRepository";
import User from "@core/Users/domain/User";
import { CreateUserDto } from "./CreateUserDto";

export default class CreateUser {

	constructor(
		private repository: IUserRepository
	){}

	public async run(data: CreateUserDto): Promise<User>{

		const exists = await this.repository.getByEmail(data.email)
		if(exists) throw new HttpException(400, 'User already exists');

		const user = new User(
			data.email,
			data.name
		)
		await user.setPassword(data.password)

		return this.repository.create(user)
	}
}

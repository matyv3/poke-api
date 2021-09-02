import HttpException from "@core/Common/HttpException";
import IUserRepository from "@core/Users/domain/IUserRepository";
import User from "@core/Users/domain/User";
import { AuthenticateDto } from "./AuthenticateDto";
import { AuthResponseDto } from "./AuthResponseDto";
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@config/environment";

export default class Authenticate {

	constructor(
		private repository: IUserRepository
	){}

	public async run(data: AuthenticateDto): Promise<AuthResponseDto>{
		const user = await this.repository.getByEmail(data.email)
		if(!user) throw new HttpException(404, 'Invalid credentials');

		const match = await user.comparePassword(data.password)

		if(!match) throw new HttpException(404, 'Invalid credentials');

		return {
			token: this.getAuthToken(user),
			user: {
				id: user.id,
				email: user.email,
				name: user.name
			}
		}
	}

	public getAuthToken(user: User): string{
		return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
	}
}

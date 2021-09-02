import { injectable } from "inversify";
import { getRepository } from "typeorm";
import IUserRepository from "../domain/IUserRepository";
import User from "../domain/User";

@injectable()
export default class UserRepository implements IUserRepository {

	public async create(user: User): Promise<User> {
		const repo = getRepository(User)
		return await repo.save(user)
	}

	public async getByEmail(email: string): Promise<User|undefined> {
		const repo = getRepository(User)
		return await repo.findOne({ email })
	}

	public async getById(id: number): Promise<User|undefined> {
		throw new Error('method not implemented')
	}
}

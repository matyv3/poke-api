import User from "./User";

export default interface IUserRepository {

	create(user: User): Promise<User>;
	getByEmail(email: string): Promise<User|undefined>;
	getById(id: number): Promise<User|undefined>;
}

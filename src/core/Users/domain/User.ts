import * as bcrypt from "bcryptjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export default class User {

	@PrimaryGeneratedColumn()
	public id!: number;

	@Column({ type: 'varchar', unique: true })
	public email: string;

	@Column({ type: 'varchar' })
	public name: string;

	@Column({ type: 'varchar' })
	private password!: string;

	constructor(
		email: string,
		name: string,
	){
		this.email = email
		this.name = name
	}

	public async setPassword(password: string){
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(password, salt);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}

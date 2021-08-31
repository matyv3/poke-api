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
	private password: string;

	constructor(
		email: string,
		name: string,
		password: string
	){
		this.email = email
		this.name = name
		this.password = password // TODO decode / encode
	}
}

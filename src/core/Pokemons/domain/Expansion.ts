import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ name: 'expansions' })
export default class Expansion {

	@PrimaryGeneratedColumn()
	public id!: number;

	@Column({ type: 'varchar' })
	public name: string;

	constructor(
		name: string
	){
		this.name = name
	}
}

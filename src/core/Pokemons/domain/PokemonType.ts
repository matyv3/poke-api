import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({ name: 'types' })
export default class PokemonType {

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

import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity({ name: 'pokemons' })
export default class Pokemon {

	@PrimaryGeneratedColumn()
	public id!: number;
	
	@Column({ type: 'varchar' })
	public name: string;

	@Column({ type: 'int' })
	public hp: number;

	@Column({ type: 'tinyint' })
	public firstEdition: boolean;

	@Column({ type: 'varchar' })
	public expansion: string;

	@Column({ type: 'varchar' })
	public type: string;

	@Column({ type: 'varchar' })
	public rarity: string;

	@Column({ type: 'float' })
	public price: number;

	@Column({ type: 'varchar' })
	public image: string;

	@CreateDateColumn()
	public createdAt: Date;

	constructor(
		name: string,
		hp: number,
		firstEdition: boolean,
		expansion: string,
		type: string,
		rarity: string,
		price: number,
		image: string,
	){
		this.name = name;
		this.hp = hp;
		this.firstEdition = firstEdition;
		this.expansion = expansion;
		this.type = type;
		this.rarity = rarity;
		this.price = price;
		this.image = image;
		this.createdAt = new Date()
	}
}

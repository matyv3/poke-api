import Rarities from "@core/Common/Rarities";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import Expansion from "./Expansion";
import PokemonType from "./PokemonType";

@Entity({ name: 'pokemons' })
export default class Pokemon {

	@PrimaryGeneratedColumn()
	public id!: number;
	
	@Column({ type: 'varchar' })
	public name: string;

	@Column({ type: 'int' })
	public hp: number;

	@Column({ type: 'boolean' })
	public firstEdition: boolean;

	@ManyToOne(type => Expansion)
	@JoinColumn()
	public expansion: Expansion;

	@ManyToOne(type => PokemonType)
	@JoinColumn()
	public type: PokemonType;

	@Column({ 
		type: 'enum',
		enum: Rarities
	})
	public rarity: Rarities;

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
		expansion: Expansion,
		type: PokemonType,
		rarity: Rarities,
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

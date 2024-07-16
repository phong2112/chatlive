import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Declares the class as an entity
export class User {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  age: number;

  @Column({
    nullable: true,
  }) // Specifies a regular column
  firstname: string;

  @Column({
    nullable: true,
  }) // Specifies a regular column
  lastname: string;

  @Column({
    unique: true,
  })
  email: string;
}

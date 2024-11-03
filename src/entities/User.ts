import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Board } from './Board';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @Column()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Board, (board) => board.owner)
  ownedBoards!: Board[];

  @ManyToMany(() => Board, (board) => board.users)
  boards!: Board[];
}

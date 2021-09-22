import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  
  @Entity()
  @Unique(["username"])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    username: string;
  
    @Column()
    @Length(4, 100)
    password: string;
  
    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    email: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }
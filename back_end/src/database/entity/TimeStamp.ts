import { Column, ManyToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { User } from "./User";

abstract class ITimeStamp {

    @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    updatedAt: Date
    
}

export { ITimeStamp }
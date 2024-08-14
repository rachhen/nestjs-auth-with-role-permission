import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./user.entity"
import { Permission } from "./permission.entity"

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column({ name: 'deleted_at', nullable: true })
    deletedAt?: Date

    @ManyToOne(() => User, (user) => user.role)
    users: User[]

    @ManyToOne(() => Permission, (permission) => permission.role)
    permissions: Permission[]
}
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Role } from "./role.entity"

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'role_id' })
    roleId: number

    @Column()
    action: string

    @Column()
    subject: string

    @Column({ default: false })
    inverted: boolean

    @Column({ name: 'conditions', type: 'jsonb', nullable: true })
    conditions: string

    @Column({ nullable: true })
    reason: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column({ name: 'deleted_at', nullable: true })
    deletedAt?: Date

    @OneToMany(() => Role, (role) => role.permissions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role
}
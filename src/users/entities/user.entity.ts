import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Role } from "./role.entity"
import { Story } from "src/stories/entities/story.entity"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'first_name', length: 100 })
    firstName: string

    @Column({ name: 'last_name', length: 100 })
    lastName: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ name: 'role_id' })
    roleId: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column({ name: 'deleted_at', nullable: true })
    deletedAt?: Date

    @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
    role: Role

    @OneToMany(() => Story, (story) => story.user)
    stories: Story[]
}
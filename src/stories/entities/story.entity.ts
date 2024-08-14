import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('stories')
export class Story {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ name: 'user_id' })
    userId: number

    @ManyToOne(() => User, (user) => user.stories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

}
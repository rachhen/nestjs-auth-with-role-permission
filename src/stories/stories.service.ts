import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StoriesService {
    async create(params: any, user: User) {
        return ''
    }

    async update(storyId: number, params: any, user: User) {
        return ''
    }

    async delete(storyId: number) {
        return ''
    }

    async list() {
        return ''
    }
}

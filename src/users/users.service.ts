import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(Permission)
        private readonly permissionRepo: Repository<Permission>
    ) { }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepo.findOne({
            where: { email },
        });
    }

    async findById(id: number): Promise<User | undefined> {
        return this.userRepo.findOne({
            where: { id },
        });
    }

    findPermissionAll(roleId: number) {
        return this.permissionRepo.find({
            where: { roleId }
        })
    }
}

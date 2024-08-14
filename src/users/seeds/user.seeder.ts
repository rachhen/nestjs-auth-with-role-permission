import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from 'bcryptjs'

import { User } from "../entities/user.entity";

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {


        const repository = dataSource.getRepository(User);
        await repository.insert([
            {
                id: 1,
                firstName: 'Admin',
                lastName: 'Sys',
                roleId: 1,
                email: 'admin@example.com',
                password: hash('123456')
            },
            {
                id: 2,
                firstName: 'User',
                lastName: 'Sys',
                roleId: 2,
                email: 'user@example.com',
                password: hash('123456')
            }
        ]);

        const userFactory = factoryManager.get(User);
        await userFactory.saveMany(5);
    }
}

function hash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}
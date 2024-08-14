import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Role } from "../entities/role.entity";

export default class RoleSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {

        const repository = dataSource.getRepository(Role);
        await repository.upsert({
            id: 1,
            name: 'Admin'
        }, ['id']);
        await repository.upsert({
            id: 2,
            name: 'User'
        }, ['id']);
    }
}
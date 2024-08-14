import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Permission } from "../entities/permission.entity";

export default class PermissionSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {

        const repository = dataSource.getRepository(Permission);
        await repository.upsert([
            {
                id: 1,
                roleId: 1,
                action: 'manage',
                subject: 'all'
            },
            {
                id: 2,
                roleId: 2,
                action: 'read',
                subject: 'Story'
            },
            {
                id: 3,
                roleId: 2,
                action: 'manage',
                subject: 'Story',
                conditions: JSON.stringify({ userId: '{{ id }}' })
            }
        ], ['id']);

    }
}
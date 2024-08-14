import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AbilitiesGuard } from './abilities.guard';

@Module({
    imports: [UsersModule],
    controllers: [],
    providers: [AbilitiesGuard],
})
export class CaslModule {}

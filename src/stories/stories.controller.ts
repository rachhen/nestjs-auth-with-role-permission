import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';

import { checkAbilites } from 'src/casl/abilities.decorator';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
import { User } from 'src/users/entities/user.entity';
import { StoriesService } from './stories.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('stories')
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) { }

    @checkAbilites({ action: 'manage', subject: 'all' })
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @Post()
    create(
        @Body() params: any,
        @CurrentUser() user: User
    ): any {
        return this.storiesService.create(params, user);
    }

    @checkAbilites({ action: 'read', subject: 'Story' })
    @UseGuards(JwtAuthGuard, AbilitiesGuard)
    @Get(':id')
    list() {
        return this.storiesService.list()
    }

    @checkAbilites({
        action: 'read',
        subject: 'Story',
        conditions: true
    })
    @UseGuards(AbilitiesGuard)
    @Put(':id')
    update(
        @Body() params: any,
        @Param('id', new ParseIntPipe()) storyId: number,
        @CurrentUser() user: User
    ): any {
        return this.storiesService.update(storyId, params, user)
    }

    @Delete(':id')
    delete(
        @CurrentUser() user: User,
        @Param('id', new ParseIntPipe()) storyId: number
    ): any {
        return this.storiesService.delete(storyId)
    }
}

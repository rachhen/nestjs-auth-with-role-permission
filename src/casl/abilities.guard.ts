import * as Mustache from 'mustache';
import { Reflector } from '@nestjs/core';
import { map, size } from 'lodash';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import {
    subject,
    RawRuleOf,
    MongoAbility,
    ForcedSubject,
    ForbiddenError,
    createMongoAbility
} from '@casl/ability';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
    ForbiddenException
} from '@nestjs/common';

import { RequiredRule, CHECK_ABILITY } from './abilities.decorator';
import { User } from 'src/users/entities/user.entity';

export const actions = [
    'read',
    'manage',
    'create',
    'update',
    'delete'
] as const;

export const subjects = ['Story', 'User', 'all'] as const;

export type Abilities = [
    (typeof actions)[number],
    (
        | (typeof subjects)[number]
        | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
    )
];

export type AppAbility = MongoAbility<Abilities>;

@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(private reflector: Reflector, private dataSource: DataSource) { }

    createAbility = (rules: RawRuleOf<AppAbility>[]) =>
        createMongoAbility<AppAbility>(rules);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules: any =
            this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
            [];
        const currentUser: User = context.switchToHttp().getRequest().user;
        const request: Request = context.switchToHttp().getRequest();

        const userPermissions = await this.dataSource.query(`SELECT * FROM permissions WHERE role_id = ${currentUser.roleId}`)

        const parsedUserPermissions = this.parseCondition(
            userPermissions,
            currentUser
        );

        try {
            const ability = this.createAbility(Object(parsedUserPermissions));

            for await (const rule of rules) {
                let sub = {};
                if (size(rule?.conditions)) {
                    const subId = +request.params['id'];
                    sub = await this.getSubjectById(subId, rule.subject);
                }

                ForbiddenError.from(ability)
                    .setMessage('You are not allowed to perform this action')
                    .throwUnlessCan(rule.action, subject(rule.subject, sub));
            }
            return true;
        } catch (error) {
            if (error instanceof ForbiddenError) {
                throw new ForbiddenException(error.message);
            }
            throw error;
        }
    }

    parseCondition(permissions: any, currentUser: User) {
        const data = map(permissions, (permission) => {
            const conditions = JSON.parse(permission.conditions || "{}")
            if (size(conditions)) {
                const parsedVal = Mustache.render(conditions['userId'], currentUser);
                return {
                    ...permission,
                    conditions: { userId: +parsedVal }
                };
            }
            return permission;
        });
        return data;
    }

    async getSubjectById(id: number, subName: string) {
        const [subject] = await this.dataSource.query(`SELECT * FROM ${subName} WHERE id = ${id}`)

        if (!subject) throw new NotFoundException(`${subName} not found`);
        return subject;
    }
}
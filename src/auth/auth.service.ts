import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isMatch = bcrypt.compareSync(pass, user.password);

        if (!isMatch) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const { password, ...result } = user;

        return result as User;
    }

    async login(user: User): Promise<any> {
        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload)

        return { accessToken, user };
    }
}

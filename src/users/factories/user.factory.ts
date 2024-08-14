import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcryptjs'

import { User } from '../entities/user.entity';

export default setSeederFactory(User, (faker) => {
    const user = new User();

    const sexFlag = faker.number.int(1);
    const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';
    const roleId = faker.number.int({ min: 1, max: 2 })

    user.firstName = faker.person.firstName(sex);
    user.lastName = faker.person.lastName(sex);
    user.email = faker.internet.email({ firstName: user.firstName, lastName: user.lastName, provider: 'gmail.com' });
    user.password = bcrypt.hashSync('123456', bcrypt.genSaltSync());
    user.roleId = roleId;

    return user;
});
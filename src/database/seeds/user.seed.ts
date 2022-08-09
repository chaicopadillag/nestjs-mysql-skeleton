import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../modules/user/entities/user.entity';

export class UserSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)()
      //   .map(async (user) => {
      //     user.roles = ['admin'];
      //     return user;
      //   })
      .create({
        userName: process.env.ADMIN_USER || 'dev',
        password: process.env.ADMIN_PASSWORD || '123456',
      });

    await factory(User)().seedMany(10);
  }
}

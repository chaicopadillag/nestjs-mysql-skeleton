import { define } from 'typeorm-seeding';
import { randEmail, randPassword, randUserName } from '@ngneat/falso';
import { User } from '../../modules/user/entities/user.entity';

define(User, () => {
  const user = new User();
  user.userName = randUserName();
  user.email = randEmail();
  user.password = randPassword();

  return user;
});

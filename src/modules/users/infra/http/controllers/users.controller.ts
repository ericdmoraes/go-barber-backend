// index, show, create, update, delete

import { Request, Response } from 'express';

// Dependency Injection
import { container } from 'tsyringe';

// Services
import CreateUserService from '@modules/users/services/CreateUser.service';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar.service';

export default class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const userService = container.resolve(CreateUserService);

    const createdUser = await userService.run({ name, email, password });

    // delete createdUser.password;

    return res.json(createdUser);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.run({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  }
}

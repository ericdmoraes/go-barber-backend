// Modules
import { Request, Response } from 'express';

// Dependency Injection
import { container } from 'tsyringe';

// Services
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfile.service';
import ShowUserProfileService from '@modules/users/services/ShowUserProfile.service';

export default class UsersController {
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const user = await showUserProfile.run({ userId: id });

    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email, name, password, oldPassword } = req.body;
    const { id } = req.user;

    const updateProfileService = container.resolve(UpdateUserProfileService);

    const updatedUser = await updateProfileService.run({
      email,
      name,
      userId: id,
      password,
      oldPassword,
    });

    return res.json(updatedUser);
  }
}

// index, show, create, update, delete

import { Request, Response } from 'express';

// Services
import ResetpasswordService from '@modules/users/services/ResetPassword.service';

// dependency injection
import { container } from 'tsyringe';

export default class ResetPasswordController {
  async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPassword = container.resolve(ResetpasswordService);

    await resetPassword.run({
      password,
      token,
    });

    return res.status(204).json();
  }
}

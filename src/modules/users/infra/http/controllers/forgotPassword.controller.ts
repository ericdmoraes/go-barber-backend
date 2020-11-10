import { Request, Response } from 'express';

// Services
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmail.service';

// dependency injection
import { container } from 'tsyringe';

export default class ForgotpasswordtController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.run({
      email,
    });

    return res.status(204).json();
  }
}

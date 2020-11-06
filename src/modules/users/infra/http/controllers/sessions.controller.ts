import { Request, Response } from 'express';

// Services
import CreateSessionService from '@modules/users/services/CreateSession.service';

// dependency injection
import { container } from 'tsyringe';

export default class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSessionService);

    const { user, token } = await createSession.run({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}

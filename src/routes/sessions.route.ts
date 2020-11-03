import { Router } from 'express';

// Services
import CreateSession from '../services/CreateSession.service';

const SessionsRouter = Router();

SessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const createSession = new CreateSession();

  const { user, token } = await createSession.run({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default SessionsRouter;

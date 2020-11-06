import { Router } from 'express';

// controllers
import SessionsController from '../controllers/sessions.controller';

const SessionsRouter = Router();

const sessionController = new SessionsController();

SessionsRouter.post('/', sessionController.create);

export default SessionsRouter;

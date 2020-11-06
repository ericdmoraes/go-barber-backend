import { Router } from 'express';
import multer from 'multer';

// config
import uploadConfig from '@config/upload.config';

// Middlewares
import ensureAuth from '../middlewares/ensureAuth.middleware';

// controllers
import UsersController from '../controllers/users.controller';

// Router
const UsersRouter = Router();

const userController = new UsersController();

// multer instance
const upload = multer(uploadConfig);

UsersRouter.post('/', userController.create);

UsersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  userController.update,
);

export default UsersRouter;

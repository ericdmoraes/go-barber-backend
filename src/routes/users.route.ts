import { Router } from 'express';
import multer from 'multer';

// config
import uploadConfig from '../config/upload.config';

// Services
import CreateUserService from '../services/CreateUser.service';
import UpdateUserAvatarService from '../services/UpdateUserAvatar.service';

// Middlewares
import ensureAuth from '../middlewares/ensureAuth.middleware';

// Router
const UsersRouter = Router();

// multer instance
const upload = multer(uploadConfig);

UsersRouter.post('/', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const userService = new CreateUserService();

    const createdUser = await userService.run({ name, email, password });

    delete createdUser.password;

    return res.json(createdUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

UsersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.run({
      user_id: req.user.id,
      avatar_filename: req.file.filename,
    });

    return res.json(user);
  },
);

export default UsersRouter;

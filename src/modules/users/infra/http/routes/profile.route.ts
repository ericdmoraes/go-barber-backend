import { Router } from 'express';

// Middlewares
import ensureAuth from '../middlewares/ensureAuth.middleware';

// controllers
import ProfileController from '../controllers/profile.controller';

// Router
const ProfileRouter = Router();

const profileController = new ProfileController();

ProfileRouter.use(ensureAuth);
ProfileRouter.put('/', profileController.update);
ProfileRouter.get('/', profileController.show);

export default ProfileRouter;

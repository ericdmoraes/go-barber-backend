import { Router } from 'express';

import ForgotPasswordController from '../controllers/forgotPassword.controller';
import ResetPasswordController from '../controllers/resetPassword.controller';

const PasswordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

PasswordRouter.post('/forgot', forgotPasswordController.create);
PasswordRouter.post('/reset', resetPasswordController.create);

export default PasswordRouter;

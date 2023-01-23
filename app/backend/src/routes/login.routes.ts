import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import JwtAuth from '../utils/jwtAuth';
import UserRepository from '../repository/UserSequelizeRepository';
import User from '../database/models/User';
import LoginValidations from '../middlewares/LoginValidations';

const router = Router();

const authMethods = new JwtAuth();
const repository = new UserRepository(User);
const service = new LoginService(authMethods, repository);
const controller = new LoginController(service);

router.post(
  '/',
  LoginValidations.validateLoginInputs,

  controller.login,
);
router.get(
  '/validate',
  LoginValidations.verifyToken,

  controller.loginValidate,
);

export default router;

import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import JwtAuth from '../utils/jwtAuth';
import UserRepository from '../repository/UserRepository';
import User from '../database/models/User';

const router = Router();

const authMethods = new JwtAuth();
const repository = new UserRepository(User);
const service = new LoginService(authMethods, repository);
const controller = new LoginController(service);

router.post('/', controller.login);

export default router;
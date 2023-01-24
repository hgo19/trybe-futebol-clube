import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchesServices from '../services/MatchesService';
import MatchSequelizeRepository from '../repository/MatchSequelizeRepository';
import LoginValidations from '../middlewares/LoginValidations';
import JwtAuth from '../utils/jwtAuth';
import TeamSequelizeRepository from '../repository/TeamSequelizeRepository';

const router = Router();

const authMethods = new JwtAuth();
const teamRepository = new TeamSequelizeRepository();
const matchRepository = new MatchSequelizeRepository();
const service = new MatchesServices(matchRepository, teamRepository);
const controller = new MatchController(service, authMethods);

router.get('/', controller.getAll);
router.post('/', LoginValidations.verifyToken, controller.insert);
router.patch('/:id/finish', LoginValidations.verifyToken, controller.finishMatch);

export default router;

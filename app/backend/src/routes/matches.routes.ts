import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchesServices from '../services/MatchesService';
import MatchSequelizeRepository from '../repository/MatchSequelizeRepository';
import LoginValidations from '../middlewares/LoginValidations';

const router = Router();

const repository = new MatchSequelizeRepository();
const service = new MatchesServices(repository);
const controller = new MatchController(service);

router.get('/', controller.getAll);
router.post('/', LoginValidations.verifyToken, controller.insert);
router.patch('/:id/finish', LoginValidations.verifyToken, controller.finishMatch);

export default router;

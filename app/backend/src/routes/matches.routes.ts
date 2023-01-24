import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchesServices from '../services/MatchesService';
import MatchSequelizeRepository from '../repository/MatchSequelizeRepository';

const router = Router();

const repository = new MatchSequelizeRepository();
const service = new MatchesServices(repository);
const controller = new MatchController(service);

router.get('/', controller.getAll);
router.post('/', controller.insert);

export default router;

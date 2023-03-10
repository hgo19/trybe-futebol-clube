import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamsService from '../services/TeamsService';
import Team from '../database/models/Team';
import TeamRepository from '../repository/TeamSequelizeRepository';

const router = Router();

const repository = new TeamRepository(Team);
const service = new TeamsService(repository);
const controller = new TeamController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

export default router;

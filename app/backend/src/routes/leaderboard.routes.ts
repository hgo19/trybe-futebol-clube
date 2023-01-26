import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardSequelizeRepository from '../repository/LeaderboardSequelizeRepository';
import LeaderboardService from '../services/LeaderboardService';

const router = Router();

const repository = new LeaderboardSequelizeRepository();
const service = new LeaderboardService(repository);
const controller = new LeaderboardController(service);

router.get('/home', controller.getHomeLeaderboard);
router.get('/away', controller.getAwayLeaderboard);
router.get('/', controller.getFullLeaderboard);

export default router;

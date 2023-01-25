import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderBoardSequelizeRepository from '../repository/LeaderboardSequelizeRepository';
import LeaderboardService from '../services/LeaderboardService';

const router = Router();

const repository = new LeaderBoardSequelizeRepository();
const service = new LeaderboardService(repository);
const controller = new LeaderboardController(service);

router.get('/home', controller.getHomeLeaderboard);
router.get('/away', controller.getAwayLeaderboard);

export default router;

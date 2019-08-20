import express from 'express';
import authCheck from '../middlewares/authCheck';
import reviewController from '../controllers/reviewController';

const routes = express.Router();

routes.post('/sessions/:sessionId/review',authCheck,reviewController.review);
export default routes;   
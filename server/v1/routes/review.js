import express from 'express';
import authCheck from '../middlewares/authCheck';
import adminCheck from '../middlewares/adminCheck';
import reviewController from '../controllers/reviewController';

const routes = express.Router();

routes.post('/sessions/:sessionId/review',authCheck,reviewController.review)
  .delete('/sessions/:sessionId/review',authCheck,adminCheck,reviewController.Deletereview)
  .get('/reviews/:reviewId',authCheck,reviewController.showReview);

export default routes;   
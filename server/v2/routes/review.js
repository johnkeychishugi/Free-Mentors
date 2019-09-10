import express from 'express';
import authCheck from '../middlewares/authCheck';
import adminCheck from '../middlewares/adminCheck';
import mentorCheck from '../middlewares/mentorCheck';
import reviewController from '../controllers/reviewController';

const routes = express.Router();

routes.post('/sessions/:sessionId/review',authCheck,mentorCheck,reviewController.review)
  .get('/reviews/:reviewId',authCheck,reviewController.showReview)
  .delete('/sessions/:sessionId/review',authCheck,adminCheck,reviewController.Deletereview);

export default routes;   
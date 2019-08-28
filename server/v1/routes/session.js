import express from 'express';
import authCheck from '../middlewares/authCheck';
import mentorCheck from '../middlewares/mentorCheck';
import sessionController from '../controllers/sessionController';

const routes = express.Router();

routes.post('/sessions',authCheck,sessionController.createSession)
  .patch('/sessions/:sessionId/accept',authCheck,mentorCheck,sessionController.acceptSession)
  .patch('/sessions/:sessionId/reject',authCheck,mentorCheck,sessionController.rejectSession)
  .get('/sessions',authCheck,sessionController.getSession);
export default routes;   
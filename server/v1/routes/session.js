import express from 'express';
import authCheck from '../middlewares/authCheck';
import sessionController from '../controllers/sessionController';

const routes = express.Router();

routes.post('/sessions',authCheck,sessionController.createSession)
  .patch('/sessions/:sessionId/accept',authCheck,sessionController.acceptSession);
export default routes;   
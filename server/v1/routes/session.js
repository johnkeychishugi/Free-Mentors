import express from 'express';
import authCheck from '../middlewares/authCheck';
import sessionController from '../controllers/sessionController';

const routes = express.Router();

routes.post('/sessions',authCheck,sessionController.createSession);
export default routes;   
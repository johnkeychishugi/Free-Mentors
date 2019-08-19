import express from 'express';
import authCheck from '../middlewares/authCheck';
import adminCheck from '../middlewares/adminCheck';
import userController from '../controllers/userController';

const routes = express.Router();

routes.patch('/user/:userId',authCheck, adminCheck, userController.changeToMentor)
  .get('/mentors',authCheck,userController.mentors);

export default routes;   
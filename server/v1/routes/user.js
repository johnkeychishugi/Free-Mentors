import express from 'express';
import authCheck from '../middlewares/authCheck';
import adminCheck from '../middlewares/adminCheck';
import userController from '../controllers/userController';

const routes = express.Router();

routes.patch('/user/:userId',authCheck, adminCheck, userController.changeToMentor)
  .patch('/mentor/:userId',authCheck, adminCheck, userController.removeToMentor)
  .get('/mentors',authCheck,userController.mentors)
  .get('/mentors/:mentorId',authCheck,userController.mentor)
  .get('/admins',authCheck, adminCheck,userController.admins);

export default routes;   
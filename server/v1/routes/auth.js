import express from 'express';
import authController from '../controllers/authController';
import authCheck from '../middlewares/authCheck';


const routes = express.Router();

routes.post('/auth/signup',authController.signup)
  .post('/auth/signin',authController.signin)
  .patch('/auth/changepassword',authCheck,authController.changePassword);

export default routes;   
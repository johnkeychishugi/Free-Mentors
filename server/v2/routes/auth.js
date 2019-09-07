import express from 'express';
import authController from '../controllers/authController';
import authCheck from '../middlewares/authCheck';


const routes = express.Router();

routes.post('/auth/signup',authController.signup)
  .post('/auth/signin',authController.signin)
  .patch('/auth/updateProfile',authCheck,authController.updateProfile);

export default routes;   
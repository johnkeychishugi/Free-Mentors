import express from 'express';
import authController from '../controllers/authController';

const routes = express.Router();

routes.post('/auth/signup',authController.signup)
  .post('/auth/signin',authController.signin);

export default routes;   
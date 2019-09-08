import express from 'express';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use(authRouter);
router.use(userRouter);


export default router
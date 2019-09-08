import express from 'express';
import authRouter from './auth';
import userRouter from './user';
import sessionRouter from './session';

const router = express.Router();

router.use(authRouter);
router.use(userRouter);
router.use(sessionRouter);

export default router
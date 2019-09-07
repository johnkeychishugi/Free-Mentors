import express from 'express';
import authRouter from './auth';

const router = express.Router();

router.use(authRouter);

export default router
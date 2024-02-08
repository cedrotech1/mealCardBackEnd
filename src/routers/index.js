import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import restourentRouter from './RestourentRouter';
import CardsRouter from './CardsRouter';
import CategoriesRouter from './categoriesRouter';

const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/restaurent', restourentRouter);
router.use('/card', CardsRouter);
router.use('/categories', CategoriesRouter);


export default router;

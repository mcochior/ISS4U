import express from 'express';

import { login, register } from '../controllers/authentication';
import { isAdmin } from '../middlewares'

export default (router: express.Router) => {
    router.post('/auth/register', isAdmin, register);
    router.post('/auth/login', login)
};
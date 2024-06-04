import express from 'express';

import { login, register, logout } from '../controllers/authentication';
import { isAdmin, isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
    router.post('/auth/register', isAdmin, register);
    router.post('/auth/login', login);
    router.post('/auth/logout', isAuthenticated, logout);

};
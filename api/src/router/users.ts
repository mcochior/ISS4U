import express from 'express';

import {deleteUser, getAllUsers, updateUser, getUserBySesToken} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    router.post('/users/:session_token', getUserBySesToken)
};


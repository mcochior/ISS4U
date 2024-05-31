import express from 'express';

import {deleteUser, getAllUsers, updateUser, getUserBySesToken, getUserBySurnameAndName} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.post('/users/getIdByNameAndSurname', isAuthenticated, getUserBySurnameAndName);
    router.delete('/users', isAuthenticated, deleteUser);
    router.patch('/users', isAuthenticated, updateUser);
    router.post('/users/:session_token', getUserBySesToken);
};


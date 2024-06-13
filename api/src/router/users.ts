import express from 'express';

import {getAllUsers, getUserBySesToken, getUserBySurnameAndName} from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.post('/users/getIdByNameAndSurname', isAuthenticated, getUserBySurnameAndName);
    router.post('/users', isAuthenticated, getUserBySesToken);
};


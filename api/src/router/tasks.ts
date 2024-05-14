import express from 'express';

import {deleteTask, getAllTasks, getTask, makeTask, updateTask} from '../controllers/tasks';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/tasks', isAuthenticated, getAllTasks);
    router.get('/tasks/:nome', isAuthenticated, getTask);
    router.put('/tasks', isAuthenticated, makeTask);
    router.delete('/tasks/:nome', isAuthenticated, deleteTask);
    router.patch('/tasks/:nome', isAuthenticated, updateTask);
};


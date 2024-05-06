import express from 'express';

import {deleteTask, getAllTasks, makeTask, updateTask} from '../controllers/tasks';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/tasks', getAllTasks);
    router.put('/tasks', makeTask);
    router.delete('/tasks/:nome', deleteTask);
    router.patch('/tasks/:nome', updateTask);
};


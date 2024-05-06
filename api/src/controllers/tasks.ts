import express from 'express';

import { getTasks, getTaskByName, createTask } from '../db/tasks';

export const getAllTasks = async (req: express.Request, res:express.Response) => {
    try{
        const users = await getTasks();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}



export const makeTask = async (req: express.Request, res: express.Response) => {
    try {
        const { nome, modulo_di_riferimento, descrizione, data_inizio, data_fine, completamento } = req.body;

        if (!nome || !modulo_di_riferimento || !descrizione || !data_inizio || !data_fine || !completamento) {
            return res.sendStatus(400);
        }

        const existingUser = await getTaskByName(nome);
        
        if (existingUser) {
            return res.sendStatus(400);
        }

        const task = await createTask({
            nome,
            modulo_di_riferimento,
            descrizione,
            data_inizio,
            data_fine,
            completamento
        });

        return res.status(200).json(task).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
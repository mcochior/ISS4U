import express from 'express';

import { getTasks, getTaskByName, createTask, deleteTaskByNome } from '../db/tasks';

export const getAllTasks = async (req: express.Request, res:express.Response) => {
    try{
        const users = await getTasks();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getTask = async (req: express.Request, res:express.Response) => {
    try{
        const { nome } = req.params;

        const task = await getTaskByName(nome);
        
        if (task) {
            return res.sendStatus(400);
        }

        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}




export const makeTask = async (req: express.Request, res: express.Response) => {
    try {
        const { nome, modulo_di_riferimento, descrizione, data_inizio, data_fine, completamento, user_id } = req.body;

        if (!nome || !modulo_di_riferimento || !descrizione || !data_inizio || !data_fine || !completamento || !user_id) {
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
            completamento,
            user_id
        });

        return res.status(200).json(task).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTask = async (req: express.Request, res: express.Response) => {
    try{
        const { nome } = req.params;

        const deletedUser = await deleteTaskByNome(nome);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTask = async (req: express.Request, res: express.Response) => {
    try{
        const {nome} = req.params; //find a way to also change name
        const { modulo_di_riferimento, descrizione, data_inizio, data_fine, completamento } = req.body;

        if (!nome || !modulo_di_riferimento || !descrizione || !data_inizio || !data_fine || !completamento) {
            return res.sendStatus(400);
        }


        const task = await getTaskByName(nome);

        task.modulo_di_riferimento = modulo_di_riferimento;
        task.descrizione = descrizione;
        task.data_inizio = data_inizio;
        task.data_fine = data_fine;
        task.completamento = completamento;
        await task.save();

        return res.status(200).json(task).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
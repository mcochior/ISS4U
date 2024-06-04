import express from 'express';

import { getTasks, getTaskByName, createTask, deleteTaskByNome, getTaskById } from '../db/tasks';

export const getAllTasks = async (req: express.Request, res:express.Response) => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Gets all registered users.'
    try{
        const users = await getTasks();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getTask = async (req: express.Request, res:express.Response) => {
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Gets all registered users.'
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
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Gets all registered users.'
    try {
        const { nome, modulo_di_riferimento, descrizione, data_inizio, data_fine, user_id } = req.body;

        var completamento = false;

        if (!nome || !modulo_di_riferimento || !descrizione || !data_inizio || !data_fine || completamento || !user_id) {
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
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Gets all registered users.'
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
    // #swagger.tags = ['Tasks']
    // #swagger.description = 'Gets all registered users.'
    try{
        // const {nome} = req.params; //find a way to also change name
        const { task_id, nome, modulo_di_riferimento, descrizione, data_inizio, data_fine, completamento, user_id } = req.body;

        // if (!task_id || !nome || !modulo_di_riferimento || !descrizione || !data_inizio || !data_fine || !completamento || !user_id) {
        //     return res.sendStatus(400);
        // }

        if(
            task_id == null ||
            nome == null ||
            modulo_di_riferimento == null ||
            descrizione == null ||
            data_inizio ==  null ||
            data_fine == null ||
            completamento == null ||
            user_id == null
        ){
            return res.sendStatus(400);
        }


        const task = await getTaskById(task_id);

        task.nome = nome;
        task.modulo_di_riferimento = modulo_di_riferimento;
        task.descrizione = descrizione;
        task.data_inizio = data_inizio;
        task.data_fine = data_fine;
        task.completamento = completamento;
        task.user_id = user_id;

        await task.save();

        return res.status(200).json(task).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
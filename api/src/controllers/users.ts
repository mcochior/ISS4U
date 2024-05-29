import express from 'express';

import { deleteUserById, getUserById, getUsers, getUserBySessionToken, deleteUserByNameAndSurname } from '../db/users';

export const getAllUsers = async (req: express.Request, res:express.Response) => {
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserBySesToken = async (req: express.Request, res:express.Response) => {
    try {
        const sessionToken = req.cookies['some-auth'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        return existingUser;
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const { name, surname } = req.body;

        const deletedUser = await deleteUserByNameAndSurname(name, surname);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const {username} = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
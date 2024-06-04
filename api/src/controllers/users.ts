import express from 'express';

import { deleteUserById, getUserById, getUsers, getUserBySessionToken, deleteUserByNameAndSurname, getUserByNameAndSurname } from '../db/users';

export const getAllUsers = async (req: express.Request, res:express.Response) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Gets all registered users.'
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserBySurnameAndName = async (req: express.Request, res:express.Response) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Gets a user by their username and name.'
    try {
        const { name, surname } = req.body;


        if (!name || !surname) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserByNameAndSurname(name, surname);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        return res.status(200).json(existingUser._id);;
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const getUserBySesToken = async (req: express.Request, res:express.Response) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Gets a user by their session token.'
    try {
        const {session_token} = req.body;

        if (!session_token) {
            return res.sendStatus(404);
        }

        const existingUser = await getUserBySessionToken(session_token);

        if (!existingUser) {
            return res.sendStatus(404);
        }

        return res.status(200).json(existingUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

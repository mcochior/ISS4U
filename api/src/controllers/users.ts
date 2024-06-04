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
        const sessionToken = req.cookies['some-auth'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        return res.status(200).json(existingUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Deletes a user given their name and surname.'
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
    // #swagger.tags = ['Users']
    // #swagger.description = 'Updates a user.'
    try{
        const {id} = req.params;
        const {username} = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        // user.username = username;
        await user.save();

        return res.status(200).json(user).end();

    } catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
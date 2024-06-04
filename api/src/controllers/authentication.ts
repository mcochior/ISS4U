import { getUserByEmail, createUser, getUserByNameAndSurname, getUserBySessionToken } from '../db/users';
import express from 'express'

import { authentication, random } from '../helpers'
import { getUserBySesToken } from './users';

export const login = async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'Allows a user to login.'
    try{
        const { name, surname, password } = req.body;

        if(!name || !surname || !password){
            return res.sendStatus(400);
        }

        const user = await getUserByNameAndSurname(name, surname).select("+authentication.salt +authentication.password");

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password != expectedHash){
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('some-auth', user.authentication.sessionToken, { domain: "localhost", path: "/"})

        console.log("Cookie set:", user.authentication.sessionToken);

        
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'Logs out a user given their session token.'
    try{
        const { session_token } = req.body;

        if(!session_token){
            return res.sendStatus(400);
        }

        const user = await getUserBySessionToken(session_token);

        if (!user) {
            return res.sendStatus(400);
        }

        // delete user.authentication.sessionToken;

        user.authentication.sessionToken = undefined;

        await user.save();

        res.clearCookie('some-auth', { domain: "localhost", path: "/"})

        
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'Allows an admin to register a new non-admin user.'
    try {
        const { email, password, name, surname, dob, phone_no } = req.body;

        if (!password || !name || !surname) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByNameAndSurname(name, surname);
        
        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();

        const user = await createUser({
            email,
            name,
            surname,
            phone_no,
            dob,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
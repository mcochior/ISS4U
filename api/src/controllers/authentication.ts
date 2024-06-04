import { getUserByEmail, createUser, getUserByNameAndSurname } from '../db/users';
import express from 'express'

import { authentication, random } from '../helpers'

export const login = async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'Gets all registered users.'
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

export const register = async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['Authentication']
    // #swagger.description = 'Gets all registered users.'
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
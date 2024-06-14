import request from 'supertest';
import app from '../../src/index.ts';
import TaskModel from '../../src/db/tasks.ts';

// jest.mock('../../src/db/tasks.ts')


const extractAuthToken = (cookieString: string) => {
    const match = cookieString.match(/some-auth=([^;]+)/);
    return match ? match[1] : null;
}


describe("Users", () => {
    let authToken;
    beforeAll(async () => {
        const authResponse = await request(app)
            .post('/auth/login')
            .send({
                name: 'e',
                surname: 'e',
                password: 'a'
            });

       authToken = authResponse.headers['set-cookie'];
    });

    describe("Gets user id by name and surname", () => {
        test("Should respond with a 200 status code", async () => {
            const stuffToSend = {
                "name": "e",
                "surname": "e"
            }

            const response = await request(app)
                .post("/users/getIdByNameAndSurname")
                .set('Cookie', authToken)
                .send(stuffToSend);


            expect(response.statusCode).toBe(200)
        })
    });

    describe("Gets user by session token", () => {
        test("Should respond with a 200 status code", async () => {
            const stuffToSend = {
                "session_token": extractAuthToken(authToken[0])
            }

            const response = await request(app)
                .post("/users")
                .set('Cookie', authToken)
                .send(stuffToSend);


            expect(response.statusCode).toBe(200)
        })
    });


})
import request from 'supertest';
import app from '../../src/index.ts';
import TaskModel from '../../src/db/tasks.ts';
// jest.mock('../../src/db/tasks.ts')



describe("Authentication", () => {
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

    describe("Login a user", () => {
        test("Should respond with a 200 status code", async () => {
            const stuffToSend = {
                    "name": "k",
                    "surname": "k",
                    "password": "a"
                  
            }

            const response = await request(app)
                .post("/auth/login")
                .set('Cookie', authToken)
                .send(stuffToSend);


            expect(response.statusCode).toBe(200)
        });

        test("Should respond with a 400 status code", async () => {
            const stuffToSend = {
                "name": "wrong",
                "surname": "superwrong",
                "password": "yeahitswrongsorry"
              
            }

            const response = await request(app)
                .post("/auth/login")
                .set('Cookie', authToken)
                .send(stuffToSend);


            expect(response.statusCode).toBe(400)
        });
    });

    describe("Register a user", () => {
        test("Should respond with a 200 status code", async () => {
            const stuffToSend = {
                    "name": "test10",
                    "surname": "test10",
                    "dob": "1990-01-01T00:00:00.000Z",
                    "email": "test.test@test.com",
                    "phone_no": "123",
                    "password": "a"
                  
            }

            const response = await request(app)
                .post("/auth/register")
                .set('Cookie', authToken)
                .send(stuffToSend);


            expect(response.statusCode).toBe(200)
        });

        test("Should respond with a 400 status code", async () => {
            const stuffToSend = {
                    "nadsame": "test2",
                    "sudsarname": "test2",
                    "ddsaob": "1990-01-01T00:00:00.000Z",
                    "emdsail": "test.test@test.com",
                    "phdsone_no": "123",
                    "passdsword": "a"
                  
            }

            const response = await request(app)
                .post("/auth/register")
                .set('Cookie', authToken)
                .send(stuffToSend);


            expect(response.statusCode).toBe(400)
        });
    });

})
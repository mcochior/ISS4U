// import supertest from 'supertest'
// import request from 'supertest'
// import app from './app.js'

import request from 'supertest';
import app from '../../src/index.ts';
import TaskModel from '../../src/db/tasks.ts';

// jest.mock('../../src/db/tasks.ts')

describe("Tasks", () => {
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
    describe("Get all tasks", () => {
        test("Should respond with a 200 status code", async () => {

            const response = await request(app)
                .get("/tasks")
                .set('Cookie', authToken);


            expect(response.statusCode).toBe(200)
        });

        test("Should respond with a 403 status code", async () => {

            const response = await request(app)
                .get("/tasks");


            expect(response.statusCode).toBe(403)
        });
    });

    describe("Get specific task", () => {
        test("Should respond with a 200 status code", async () => {

            const response = await request(app)
                .get("/tasks/ewq")
                .set('Cookie', authToken);


            expect(response.statusCode).toBe(200)
        });

        test("Should respond with a 403 status code", async () => {
            const response = await request(app)
                .get("/tasks/ewq");


            expect(response.statusCode).toBe(403)
        });
    });

    describe("Add Task", () => {
        test("Should respond with a 200 status code", async () => {
            const newTask = {
                nome: "trttt",
                modulo_di_riferimento: "15",
                descrizione: "15",
                data_inizio: "2024-05-01",
                data_fine: "2024-05-31",
                user_id: "6655a6c9fe2b0bd65e113653"
            }
            
            const response = await request(app)
                .put(`/tasks`)
                .set('Cookie', authToken)
                .send(newTask);

            expect(response.statusCode).toBe(200)
        });

        test("Should respond with a 400 status code", async () => {
            const newTask = {
                nodsame: "trttfdsfdst",
                modulo_di_riferimento: "1ds5",
                descdsarizione: "1dsa5",
                data_inizio: "2024-05-01",
                data_fine: "2024-05-31",
                user_id: "6655a6c9fe2b0bd65e113653"
            }
            
            const response = await request(app)
                .put(`/tasks`)
                .set('Cookie', authToken)
                .send(newTask);

            expect(response.statusCode).toBe(400)
        });
    });

    describe("Modify Task", () => {
        test("Should respond with a 200 status code", async () => {
            const newTask = {
                task_id: "666afc5bd4a65c3f16a8d1ef",
                nome: "modified",
                modulo_di_riferimento: "modified",
                descrizione: "modified",
                data_inizio: "2024-05-01",
                data_fine: "2024-05-31",
                completamento: true,
                user_id: "665d66e7e000496d76e89e86"
            }
            
            const response = await request(app)
                .patch(`/tasks`)
                .set('Cookie', authToken)
                .send(newTask);

            expect(response.statusCode).toBe(200)
        });

        test("Should respond with a 400 status code", async () => {
            const newTask = {
                tadsask_id: "666afc5bd4a65c3f16a8d1ef",
                nomdsadsae: "modified",
                modulo_di_riferimento: "modified",
                descrizione: "modified",
                data_inizio: "2024-05-01",
                data_fine: "2024-05-31",
                completamento: true,
                user_id: "665d66e7e000496d76e89e86"
            }
            
            const response = await request(app)
                .patch(`/tasks`)
                .set('Cookie', authToken)
                .send(newTask);

            expect(response.statusCode).toBe(400)
        });
    });


    describe("Delete Task", () => {
        test("Should respond with a 200 status code", async () => {
            const response = await request(app)
                .delete(`/tasks/trttt`)
                .set('Cookie', authToken);

            expect(response.statusCode).toBe(200);
        });

        test("Should respond with a 400 status code", async () => {
            const response = await request(app)
                .delete(`/tasks/trttt`);

            expect(response.statusCode).toBe(403);
        });

    });
});

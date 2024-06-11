// import supertest from 'supertest'
// import request from 'supertest'
// import app from './app.js'

import request from 'supertest';
import app from '../../src/index.ts';

// describe("POST /tasks", () => {
//     describe("Given a task id", () => {
//         test("Should respond with a 200 status code", async () => {
//             const response = await request(app).post("/users").send({
//                 nome: "1",
//                 modulo_di_riferimento: "1",
//                 descrizione: "1",
//                 data_inizio: "2024-05-01",
//                 data_fine: "2024-05-31",
//                 user_id: "6655a6c9fe2b0bd65e113653"
//             })
//             expect(response.statusCode).toBe(200)
//         })
//     })

//     describe("When the task id is missing", () => {

//     })
// })

describe("GET /tasks", () => {
    describe("Get all tasks", () => {
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).get("/tasks").send({})
            expect(response.statusCode).toBe(200)
        })
    })

    describe("When the task id is missing", () => {

    })
})
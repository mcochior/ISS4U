const request = require('supertest');
const app = require('../../src/index').default;

describe("POST /tasks", () => {
  describe("Given a task id", () => {
    it("should create a new task", async () => {
      const response = await request(app).post('/tasks').send({
        id: 'some_id',
        name: 'test task'
      });
      expect(response.status).toBe(200);
    });
  });
});

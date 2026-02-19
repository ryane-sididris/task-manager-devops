const request = require('supertest');
const app = require('../server');

describe('API Tasks Endpoints', () => {

  it('should fetch all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test CI/CD',
        description: 'Vérification de la pipeline'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

});
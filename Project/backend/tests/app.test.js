const request = require('supertest');
const app = require('../server');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'tasksdb',
});

beforeAll(async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            matiere TEXT,
            title TEXT NOT NULL,
            description TEXT,
            priority TEXT DEFAULT 'Basse',
            status TEXT DEFAULT 'À faire'
        )
    `);
});

afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS tasks');
    await pool.end();
});

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
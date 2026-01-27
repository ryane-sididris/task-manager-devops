// divide.test.js - TDD pour l'endpoint de division
const request = require('supertest');
const app = require('./app');

describe('TDD - Division endpoint', () => {
  
  test('It should divide two positive integers', async () => {
    const response = await request(app).get('/divide/10/2');
    expect(response.statusCode).toBe(200);
    expect(response.body.quotient).toBe(5);
    expect(response.body.a).toBe(10);
    expect(response.body.b).toBe(2);
  });

  test('It should divide decimal numbers', async () => {
    const response = await request(app).get('/divide/10/4');
    expect(response.statusCode).toBe(200);
    expect(response.body.quotient).toBeCloseTo(2.5, 1);
  });

  test('It should handle negative numbers', async () => {
    const response = await request(app).get('/divide/-10/2');
    expect(response.statusCode).toBe(200);
    expect(response.body.quotient).toBe(-5);
  });

  test('It should return 400 for division by zero', async () => {
    const response = await request(app).get('/divide/10/0');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input');
    expect(response.body.message).toContain('division by zero');
  });

  test('It should return 400 for invalid input', async () => {
    const response = await request(app).get('/divide/abc/5');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input');
  });
});

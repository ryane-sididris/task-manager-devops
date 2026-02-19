// app.test.js
const request = require('supertest');
const app = require('./app');

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});

describe('Test the /name/:name path', () => {
  test('It should respond with a personalized greeting', async () => {
    const name = 'Alice';
    const response = await request(app).get(`/name/${name}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(`Hello, ${name}!`);
  });

  test('It should work with different names', async () => {
    const names = ['Bob', 'Charlie', 'Jean-Pierre'];
    
    for (const name of names) {
      const response = await request(app).get(`/name/${name}`);
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(`Hello, ${name}!`);
    }
  });
});

describe('Test the /add/:a/:b path', () => {
  // Tests avec des nombres valides
  test('It should add two positive integers', async () => {
    const response = await request(app).get('/add/5/3');
    expect(response.statusCode).toBe(200);
    expect(response.body.sum).toBe(8);
    expect(response.body.a).toBe(5);
    expect(response.body.b).toBe(3);
  });

  test('It should add two decimal numbers', async () => {
    const response = await request(app).get('/add/2.5/3.7');
    expect(response.statusCode).toBe(200);
    expect(response.body.sum).toBeCloseTo(6.2, 1);
  });

  test('It should handle negative numbers', async () => {
    const response = await request(app).get('/add/-5/10');
    expect(response.statusCode).toBe(200);
    expect(response.body.sum).toBe(5);
  });

  test('It should add zero correctly', async () => {
    const response = await request(app).get('/add/0/0');
    expect(response.statusCode).toBe(200);
    expect(response.body.sum).toBe(0);
  });

  // Tests avec des entrées invalides
  test('It should return 400 for non-numeric first parameter', async () => {
    const response = await request(app).get('/add/abc/5');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input');
  });

  test('It should return 400 for non-numeric second parameter', async () => {
    const response = await request(app).get('/add/5/xyz');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input');
  });

  test('It should return 400 for both parameters invalid', async () => {
    const response = await request(app).get('/add/abc/xyz');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid input');
  });
});

// e2e.test.js - Tests End-to-End
const request = require('supertest');
const app = require('./app');

describe('E2E - Full User Scenarios', () => {
  
  test('Complete calculation workflow', async () => {
    // Scénario : Utilisateur fait plusieurs calculs
    
    // 1. Addition
    const addResult = await request(app).get('/add/10/5');
    expect(addResult.statusCode).toBe(200);
    expect(addResult.body.sum).toBe(15);
    
    // 2. Multiplication avec le résultat
    const multiplyResult = await request(app)
      .get(`/multiply/${addResult.body.sum}/2`);
    expect(multiplyResult.statusCode).toBe(200);
    expect(multiplyResult.body.product).toBe(30);
    
    // 3. Vérifier endpoint racine
    const rootResult = await request(app).get('/');
    expect(rootResult.statusCode).toBe(200);
  });

  test('Error handling workflow', async () => {
    // Scénario : Utilisateur fait des erreurs
    
    // 1. Tentative avec input invalide
    const invalidAdd = await request(app).get('/add/abc/5');
    expect(invalidAdd.statusCode).toBe(400);
    expect(invalidAdd.body.error).toBe('Invalid input');
    
    // 2. Correction avec input valide
    const validAdd = await request(app).get('/add/5/5');
    expect(validAdd.statusCode).toBe(200);
    expect(validAdd.body.sum).toBe(10);
  });

  test('All endpoints are accessible', async () => {
    // Vérifier que tous les endpoints fonctionnent
    
    const endpoints = [
      { path: '/', status: 200 },
      { path: '/name/TestUser', status: 200 },
      { path: '/add/1/1', status: 200 },
      { path: '/multiply/2/3', status: 200 }
    ];

    for (const endpoint of endpoints) {
      const response = await request(app).get(endpoint.path);
      expect(response.statusCode).toBe(endpoint.status);
    }
  });
});

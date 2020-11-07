const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/users', () => {
  it('should respond with a list of users', async () => {
    const response = await supertest(app).get('/api/v1/users').expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});

const supertest = require('supertest');

const app = require('../app');

describe('GET /api/v1', () => {
  it('should respond with a message', async () => {
    const response = await supertest(app).get('/api/v1').expect(200);

    expect(response.body).toEqual('API Working');
  });
});

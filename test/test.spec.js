const request = require('supertest')
const server = require('../src/app')
const { setupDatabase } = require('./utils')

beforeAll(setupDatabase)

describe('Basic', () => {
  it('should pass', async () => {
    expect(2).toEqual(2)
  })

  it('should call api', () => {
    request(server.listen())
      .get('/')
      .expect(200)
  })
})

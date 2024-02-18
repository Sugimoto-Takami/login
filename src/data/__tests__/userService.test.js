// src/data/__tests__/userService.test.js
const getUserByField = require('../userService');
const pool = require('../../db');

jest.mock('../../db', () => ({
  query: jest.fn(),
}));

describe('getUserByField', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user object when query is successful', async () => {
    const user = { id: 1, name: 'Takami Sugimoto', email: 'takami@example.com', password: 'hashedpassword' };
    pool.query.mockResolvedValue({ rows: [user] });

    const result = await getUserByField('email', 'takami@example.com');

    expect(result).toEqual(user);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['takami@example.com']);
  });

  it('should return null when query fails', async () => {
    pool.query.mockRejectedValue(new Error('Query failed'));

    const result = await getUserByField('email', 'nonexistent@example.com');

    expect(result).toBeNull();
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['nonexistent@example.com']);
  });
});

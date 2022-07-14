require('dotenv/config');
// import { initDB, server } from '../../config/index';
// import { clearUsers } from '../../models/index.js';
const { db, hapi } = require('../../config/index');
const { user } = require('../../models/index.js');

beforeAll(async () => {
    await db.initDB();
    await hapi.initServer();
    await user.clearUsers();
});

afterAll(async () => {
    await hapi.stopServer();
    await db.disconnectDB();
})

describe('post /Register', () => {
    afterEach(async ()=> await user.clearUsers());

    test('Register new user', async () => {
        const payload = {
            "username": "Bay 3",
            "password": "baysPassword"
        }
        const injectOptions = {
            method: 'post',
            url: '/register',
            payload: payload
        };
        const response = await hapi.server.inject(injectOptions);
        expect(response.statusCode).toBe(201);
        const message = JSON.parse(response.payload)
        expect(message).toBeDefined();
    });

    // describe('bad payload', () => {

    // });
});
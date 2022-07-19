require('dotenv/config');
// import { initDB, server } from '../../config/index';
// import { clearUsers } from '../../models/index.js';
const { faker } = require('@faker-js/faker');
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

getRegisterResponse = async (payload) => {
    const injectOptions = {
        method: 'post',
        url: '/register',
        payload: payload
    };
    return await hapi.server.inject(injectOptions);
};

generatePayload = () => {
    return {
        "username": faker.datatype.string(),
        "password": faker.datatype.string()
    };
};

describe('post /Register', () => {
    afterEach(async ()=> await user.clearUsers());

    test('Register new user', async () => {
        const payload = generatePayload();
        const response = await getRegisterResponse(payload);
        expect(response.statusCode).toBe(201);
        const message = JSON.parse(response.payload).message;
        const user = JSON.parse(response.payload).user;
        expect(message).toBeDefined();
        expect(user.username).toBe(payload.username);
    });

    describe('Bad payload', () => {
        test('Empty username', async() => {
            const payload = {
                "password": faker.datatype.string()
            };
            const response = await getRegisterResponse(payload);
            expect(response.statusCode).toBe(400);
            const message = JSON.parse(response.payload).message;
            expect(message).toBeDefined();
        });
        test('Empty password', async() => {
            const payload = {
                "username": faker.datatype.string()
            };
            const response = await getRegisterResponse(payload);
            expect(response.statusCode).toBe(400);
            const message = JSON.parse(response.payload).message;
            expect(message).toBeDefined();
        });
        test('Empty string username', async() => {
            const payload = generatePayload();
            payload.username = '';
            const response = await getRegisterResponse(payload);
            expect(response.statusCode).toBe(400);
            const message = JSON.parse(response.payload).message;
            expect(message).toBeDefined();
        });
        test('Empty string password', async() => {
            const payload = generatePayload();
            payload.password = '';
            const response = await getRegisterResponse(payload);
            expect(response.statusCode).toBe(400);
            const message = JSON.parse(response.payload).message;
            expect(message).toBeDefined();
        });
        test('Number for username', async() => {
            const payload = generatePayload();
            payload.username = 123;
            const response = await getRegisterResponse(payload);
            expect(response.statusCode).toBe(400);
            const message = JSON.parse(response.payload).message;
            expect(message).toBeDefined();
        });
        test('Number for password', async() => {
            const payload = generatePayload();
            payload.password = 123;
            const response = await getRegisterResponse(payload);
            expect(response.statusCode).toBe(400);
            const message = JSON.parse(response.payload).message;
            expect(message).toBeDefined();
        });
    });

    test('Duplicate user', async () => {
        const payload = generatePayload();
        const response = await getRegisterResponse(payload);
        expect(response.statusCode).toBe(201);
        const response2 = await getRegisterResponse(payload);
        expect(response2.statusCode).toBe(409);
    });
    test('Database is down', async () => {
        await db.disconnectDB();
        const payload = generatePayload();
        const response = await getRegisterResponse(payload);
        expect(response.statusCode).toBe(500);
        await db.initDB();
    });
});

describe('post /Login', () => {
    beforeAll(async () => {
        const testUser1 = generatePayload();
        const response = getRegisterResponse(testUser1);
        expect(response.statusCode).toBe(201);
    });
});
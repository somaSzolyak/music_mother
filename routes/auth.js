const { user } = require('../models/index.js');
const { jwt } = require('../middleware/index.js');

module.exports.authRoutes = [
    {
        method: 'post',
        path: '/register',
        handler: async (request, h) => {
            try {
                const {username, password} = request.payload;
            if (!(username && password)) {
                return h.response({message: 'Username and password required'}).code(400);
            }
            if (await user.getMe(username)) {
                return h.response({message: 'User already exists.'}).code(409);
            }
            await user.register(username, password);
            const response = {'message': 'register successful'};
            return h.response(response).code(201);
            } catch(err) {
                console.log(err);
                return h.response({err}).code(500);
            }
        }
    },
    {
        method: 'post',
        path: '/login',
        handler: async (request, h) => {
            try {
                const {username, password} = request.payload;
                if (!(username && password)) {
                    h.response('Username and password required').code(400);
                }
                const user = await user.login(username, password);
                if(user) {
                    const token = jwt.getToken(user);
                    const response = {'message': 'login successful', 'token': token};
                    return h.response(response).code(200);
                } else {
                    const response = {'message': 'login unsuccessful'};
                    return h.response(response).code(401);
                }
            } catch (err) {
                console.log(err);
                return h.response(err).code(501);
            }
        }
    },
    {
        method: 'get',
        path: '/me',
        handler: async (request, h) => {
            return h.response('me').code(200);
        }
    },
    {
        method: 'post',
        path: '/logout',
        handler: async (request, h) => {
            return h.response('logout').code(200);
        }
    }
];
import { register, login, getMe } from '../models/index.js';
import { getToken } from '../middleware/index.js';

export const authRoutes = [
    {
        method: 'post',
        path: '/register',
        handler: async (request, h) => {
            const {username, password} = request.payload;
            if (!(username && password)) {
                h.response('Username and password required').code(400);
            }
            if (await getMe(username)) {
                h.response('User already exists.').code(409);
            }
            await register(username, password);
            const response = {'message': 'register successful'};
            return h.response(response).code(200);
            
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
                const user = await login(username, password);
                if(user) {
                    const token = getToken(user);
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
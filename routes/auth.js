import { register, login } from '../models/index.js';
import { server } from './index.js';

server.route({
    method: 'post',
    path: '/register',
    handler: async (request, h) => {
        const {username, password} = request.payload;
        await register(username, password);
        const response = {'message': 'register successful'};
        return h.response(response).code(200);
        
    }
});

server.route({
    method: 'post',
    path: '/login',
    handler: async (request, h) => {
        const {username, password} = request.payload;
        if(await login(username, password)) {
            const response = {'message': 'login successful'};
            return h.response(response).code(200);
        } else {
            const response = {'message': 'login unsuccessful'};
            return h.response(response).code(401);
        }
    }
});

server.route({
    method: 'get',
    path: '/me',
    handler: async (request, h) => {
        return h.response('me').code(200);
    }
});

server.route({
    method: 'post',
    path: '/logout',
    handler: async (request, h) => {
        return h.response('logout').code(200);
    }
});
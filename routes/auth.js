import { server } from './index.js'

server.route({
    method: 'post',
    path: '/register',
    handler: async (request, h) => {
        return h.response('register').code(200);
    }
})

server.route({
    method: 'post',
    path: '/login',
    handler: async (request, h) => {
        return h.response('login').code(200);
    }
})

server.route({
    method: 'get',
    path: '/me',
    handler: async (request, h) => {
        return h.response('me').code(200);
    }
})

server.route({
    method: 'post',
    path: '/logout',
    handler: async (request, h) => {
        return h.response('logout').code(200);
    }
})
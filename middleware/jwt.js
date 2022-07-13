import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

export function getToken(user) {
    try {
        const token = jwt.sign({username: user.username}, secret, {expiresIn: '1h'});
        return token;
    } catch (err) {
        console.log(err);
    }
    
}

export function getDecodedToken(token) {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}

export function verifyToken(req, h, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return h.response('Token required').code(403);
    }

    try {
        const decodedToken = getDecodedToken(token);
    } catch(err) {
        return h.response('Bad token').code(401);
    }

    return next();
}
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

export function verifyToken(token) {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
}
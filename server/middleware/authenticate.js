const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    // getting auth header
    const authHeader = req.headers.authorization;

    // checking if auth user exists and weather it starts with 'Bearer ' or not
    if(!authHeader || !authHeader.startsWith('Bearer ')) {

        return res.status(401).send({
            success: false,
            message: 'Authentication Error | No Headers Found'
        });

    }

    // taking the token of the user out of the authorization header
    const userToken = authHeader.split(' ')[1];

    // verify token, then, extract user data out of that token and then send it to controller or else, send 
    // invalid authentication error
    try {

        const payload = jwt.verify(userToken, process.env.JWT_SECRET);

        req.user = {
            userId: payload.userId, // userId is the key which stores the value of id of the user during jwt.sign(),
            userFullName: `${payload.firstname}${payload.lastname}`,
            userEmail: payload.email
        }

        next();

    } catch (error) {
        
        return res.status(500).send({
            success: false,
            message: 'Invalid Authentication'
        });
        
    }
};


module.exports = auth;
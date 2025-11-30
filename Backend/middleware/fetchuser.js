var jwt = require('jsonwebtoken');
const JWT_SECRET = 'KashifSupermostSecretkey';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

module.exports = fetchuser;
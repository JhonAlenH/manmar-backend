import User from '../db/User.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const verifyUser = async (data) => {
    const verifiedUsername = await User.verifyUser(data);
    if (verifiedUsername.error) {
        return { error: verifiedUsername.error, code: 500 };
    }
    return verifiedUsername;
}

const createJWT = (user) => {
    const payload = {
        cusuario: user.cusuario,
        xusuario: user.xusuario,
        xcorreo: user.xcorreo,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix(),
    }
    return jwt.sign(payload, process.env.JWT_SECRET)
}

const getExecutive = async (xcorreo) => {
    const executive = await User.getExecutive(xcorreo);
    return executive;
};

export default {
    verifyUser,
    createJWT,
    getExecutive
}
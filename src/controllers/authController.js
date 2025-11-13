import authService from '../service/authService.js';

const createJWT = async (req, res) => {
    const verifiedUser = await authService.verifyUser(req.body);
    if (verifiedUser.error) { 
        res
            .status(verifiedUser.code)
            .send({ 
                status: false,
                message: verifiedUser.error
            });
        return;
    }
    const jwt = authService.createJWT(verifiedUser);
    res.status(201).send({ 
        status: true, 
        message: 'Usuario Autenticado',
        data: {
            user: verifiedUser,
            token: 'Bearer ' + jwt
        }
    });
    return;
};

const getUserModules = async (req, res) => {
    const userModules = await authService.getUserModules(req.body.cusuario);
    if (userModules.error) {
        return res
            .status(userModules.code)
            .send({
                status: false,
                message: userModules.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                groups: userModules
            }
        })
}

export default {
    createJWT,
    getUserModules,
}
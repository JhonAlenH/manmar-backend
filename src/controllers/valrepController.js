import valrepService from '../service/valrepService.js';

const getCedents = async (req, res) => {
    const cedents = await valrepService.getCedents();
    if (cedents.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: cedents.permissionError
            });
    }
    if (cedents.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: cedents.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                cedents: cedents
            }
        });
}

const getTrade = async (req, res) => {
    const trades = await valrepService.getTrade();
    if (trades.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: trades.permissionError
            });
    }
    if (trades.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: trades.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                trade: trades
            }
        });
}

const getCoins = async (req, res) => {
    const coins = await valrepService.getCoins();
    if (coins.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: coins.permissionError
            });
    }
    if (coins.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: coins.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                coins: coins
            }
        });
}

const getClients = async (req, res) => {
    const clients = await valrepService.getClients();
    if (clients.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: clients.permissionError
            });
    }
    if (clients.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: clients.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                clients: clients
            }
        });
}


export default {
    getCedents,
    getTrade,
    getCoins,
    getClients
}
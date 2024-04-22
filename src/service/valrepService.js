import Valrep from '../db/Valrep.js';

const getCedents = async () => {
    const cedents = await Valrep.getCedents();
    if (cedents.error) {
        return {
            error: cedents.error
        }
    }
    return cedents;
}

const getTrade = async () => {
    const trades = await Valrep.getTrade();
    if (trades.error) {
        return {
            error: trades.error
        }
    }
    return trades;
}

const getCoins = async () => {
    const coins = await Valrep.getCoins();
    if (coins.error) {
        return {
            error: coins.error
        }
    }
    return coins;
}

const getClients = async () => {
    const clients = await Valrep.getClients();
    if (clients.error) {
        return {
            error: clients.error
        }
    }
    return clients;
}

export default {
    getCedents,
    getTrade,
    getCoins,
    getClients
}
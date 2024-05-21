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

const getBrand = async (getBrand) => {
    const brand = await Valrep.getBrand(getBrand);
    if (brand.error) {
        return {
            error: brand.error
        }
    }
    return brand;
}

const getModel = async (getModel) => {
    const model = await Valrep.getModel(getModel);
    if (model.error) {
        return {
            error: model.error
        }
    }
    return model;
}

const getVersion = async (getVersion) => {
    const version = await Valrep.getVersion(getVersion);
    if (version.error) {
        return {
            error: version.error
        }
    }
    return version;
}

const getColor = async () => {
    const color = await Valrep.getColor();
    if (color.error) {
        return {
            error: color.error
        }
    }
    return color;
}

const getMethodOfPayment = async () => {
    const payment = await Valrep.getMethodOfPayment();
    if (payment.error) {
        return {
            error: payment.error
        }
    }
    return payment;
}

const getTakers = async () => {
    const takers = await Valrep.getTakers();
    if (takers.error) {
        return {
            error: takers.error
        }
    }
    return takers;
}

const getTakersId = async (getTakersId) => {
    const takers = await Valrep.getTakersId(getTakersId);
    return takers;
}

const getState = async (getState) => {
    const state = await Valrep.getState(getState);
    if (state.error) {
        return {
            error: state.error
        }
    }
    return state;
}

const getCity = async (getCity) => {
    const city = await Valrep.getCity(getCity);
    if (city.error) {
        return {
            error: city.error
        }
    }
    return city;
}

export default {
    getCedents,
    getTrade,
    getCoins,
    getClients,
    getBrand,
    getModel,
    getVersion,
    getColor,
    getMethodOfPayment,
    getTakers,
    getTakersId,
    getState,
    getCity
}
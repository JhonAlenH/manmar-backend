import Emission from '../db/Emission.js';

const getReceipt = async (getReceipt) => {
    const receipt = await Emission.getReceipt(getReceipt);
    if (receipt.error) {
        return {
            error: receipt.error
        }
    }
    return receipt;
}

const getProducers = async () => {
    const producers = await Emission.getProducers();
    if (producers.error) {
        return {
            error: producers.error
        }
    }
    return producers;
}

const getTariffs = async (getTariffs) => {
    const tariffs = await Emission.getTariffs(getTariffs);
    if (tariffs.error) {
        return {
            error: tariffs.error
        }
    }
    return tariffs;
}

const searchContract = async (searchContract) => {
    const contracts = await Emission.searchContract(searchContract);
    if (contracts.error) {
        return {
            error: contracts.error
        }
    }
    return contracts;
}

const createContract = async (createContract) => {
    const create = await Emission.createContract(createContract);
    if (create.error) {
        return {
            error: create.error
        }
    }
    return create;
}

export default {
    getReceipt,
    getProducers,
    getTariffs,
    searchContract,
    createContract
}
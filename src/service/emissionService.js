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

const getReceiptUpdate = async (getReceiptUpdate) => {
    const receipt = await Emission.getReceiptUpdate(getReceiptUpdate);
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

const detailContract = async (id) => {
    const contract = await Emission.detailContract(id);
    if (contract.error) {
        return {
            error: contract.error
        }
    }
    return contract;
}

const updateContract = async (updateContract) => {
    const update = await Emission.updateContract(updateContract);
    if (update.error) {
        return {
            error: update.error
        }
    }
    return update;
}

const searchPolicy = async (xpoliza) => {
    const policy = await Emission.searchPolicy(xpoliza);
    if (policy.error) {
        return {
            error: policy.error
        }
    }
    return policy;
}

const searchReceipt = async (id) => {
    const receipt = await Emission.searchReceipt(id);
    if (receipt.error) {
        return {
            error: receipt.error
        }
    }
    return receipt;
}

const updateReceipt = async (updateReceipt) => {
    const update = await Emission.updateReceipt(updateReceipt);
    if (update.error) {
        return {
            error: update.error
        }
    }
    return update;
}

export default {
    getReceipt,
    getReceiptUpdate,
    getProducers,
    getTariffs,
    searchContract,
    createContract,
    detailContract,
    updateContract,
    searchPolicy,
    searchReceipt,
    updateReceipt
}
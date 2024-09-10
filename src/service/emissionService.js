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

const documentsContract = async (id) => {
    const document = await Emission.documentsContract(id);
    if (document.error) {
        return {
            error: document.error
        }
    }
    return document;
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

const searchComplement = async (id) => {
    const complement = await Emission.searchComplement(id);
    if (complement.error) {
        return {
            error: complement.error
        }
    }
    return complement;
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

const searchDueReceipt = async () => {
    const receipt = await Emission.searchDueReceipt();
    if (receipt.error) {
        return {
            error: receipt.error
        }
    }
    return receipt;
}

const updateReceiptPremium = async (updateReceiptPremium) => {
    const update = await Emission.updateReceiptPremium(updateReceiptPremium);
    if (update.error) {
        return {
            error: update.error
        }
    }
    return update;
}

const searchFertilizers = async (searchFertilizers) => {
    const abonos = await Emission.searchFertilizers(searchFertilizers);
    if (abonos.error) {
        return {
            error: abonos.error
        }
    }
    return abonos;
}

const feeCharged = async () => {
    const fee = await Emission.feeCharged();
    if (fee.error) {
        return {
            error: fee.error
        }
    }
    return fee;
}

const createComplement = async (createComplement) => {
    const create = await Emission.createComplement(createComplement);
    if (create.error) {
        return {
            error: create.error
        }
    }
    return create;
}

const createAbono = async (createAbono) => {
    const create = await Emission.createAbono(createAbono);
    if (create.error) {
        return {
            error: create.error
        }
    }
    return create;
}

const searchDistribution = async (searchDistribution) => {
    const distribucion = await Emission.searchDistribution(searchDistribution);
    if (distribucion.error) {
        return {
            error: distribucion.error
        }
    }
    return distribucion;
}

const paymentProductor = async (paymentProductor) => {
    const payment = await Emission.paymentProductor(paymentProductor);
    if (payment.error) {
        return {
            error: payment.error
        }
    }
    return payment;
}

const paymentEjecutivo = async (paymentEjecutivo) => {
    const payment = await Emission.paymentEjecutivo(paymentEjecutivo);
    if (payment.error) {
        return {
            error: payment.error
        }
    }
    return payment;
}


export default {
    getReceipt,
    getReceiptUpdate,
    getProducers,
    getTariffs,
    searchContract,
    createContract,
    detailContract,
    documentsContract,
    updateContract,
    searchPolicy,
    searchReceipt,
    searchComplement,
    updateReceipt,
    searchDueReceipt,
    updateReceiptPremium,
    searchFertilizers,
    feeCharged,
    createComplement,
    createAbono,
    searchDistribution,
    paymentProductor,
    paymentEjecutivo
}
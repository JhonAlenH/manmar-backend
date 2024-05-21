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

export default {
    getReceipt,
}
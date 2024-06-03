import emissionService from '../service/emissionService.js';

const getReceipt = async (req, res) => {
    const receipt = await emissionService.getReceipt(req.body);
    if (receipt.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: receipt.permissionError
            });
    }
    if (receipt.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: receipt.error
            });
    }
    const formattedList = receipt.recordset.map((item) => ({
        fdesde_rec: item.fdesde_rec,
        fhasta_rec: item.fhasta_rec,
        mprima: item.mprima
    }));
    return res
        .status(200)
        .send({
            status: true,
            data: {
                receipt: formattedList
            }
        });
}

const getProducers = async (req, res) => {
    const producers = await emissionService.getProducers();
    if (producers.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: producers.permissionError
            });
    }
    if (producers.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: producers.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            cproductor: producers.cproductor,
            xproductor: producers.xproductor,
            pcomision: producers.pcomision,
        });
}

export default {
    getReceipt,
    getProducers
}
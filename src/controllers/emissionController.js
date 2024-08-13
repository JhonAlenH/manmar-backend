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

const getReceiptUpdate = async (req, res) => {
    const receipt = await emissionService.getReceiptUpdate(req.body);
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
        fdesde: item.fdesde,
        fhasta: item.fhasta,
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

const getTariffs = async (req, res) => {
    const tariffs = await emissionService.getTariffs(req.body);
    if (tariffs.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: tariffs.permissionError
            });
    }
    if (tariffs.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: tariffs.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            pcomision: tariffs.pcomision
        });
}

const searchContract = async (req, res) => {
    const contracts = await emissionService.searchContract(req.body);
    if (contracts.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: contracts.permissionError
            });
    }
    if (contracts.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: contracts.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                contracts: contracts
            }
        });
}

const createContract = async (req, res) => {
    const create = await emissionService.createContract(req.body);
    if (create.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: create.permissionError
            });
    }
    if (create.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: create.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            message: `La póliza ${req.body.xpoliza} ha sido creada exitosamente`
        });
}

const detailContract = async (req, res) => {
    const contratos = await emissionService.detailContract(req.params.id);
    if (contratos.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: contratos.permissionError
            });
    }
    if (contratos.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: contratos.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: contratos
        });
}

const updateContract = async (req, res) => {
    const update = await emissionService.updateContract(req.body);
    if (update.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: update.permissionError
            });
    }
    if (update.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: update.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            message: `Se ha actualizado el contrato exitosamente`
        });
}

const searchPolicy = async (req, res) => {
    const policy = await emissionService.searchPolicy(req.params.xpoliza);
    if (policy.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: policy.permissionError
            });
    }
    if (policy.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: policy.error
            });
    }
    if(!policy.xpoliza){
        return res.status(200).send({
            status: true
        });
    }else{
        return res.status(200).send({
            status: true,
            xpoliza: policy.xpoliza,
            message: `Estimado usuario, el número de póliza ingresado se encuentra con una vigencia activa, por favor coloque otro número`,
        });
    }

}

const searchReceipt = async (req, res) => {
    const receipt = await emissionService.searchReceipt(req.params.id);
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
    return res
        .status(200)
        .send({
            status: true,
            receipt: receipt
        });
}

const updateReceipt = async (req, res) => {
    const update = await emissionService.updateReceipt(req.body);
    if (update.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: update.permissionError
            });
    }
    if (update.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: update.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            status_receipt: true,
            message: `Se ha actualizado el recibo exitosamente`
        });
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
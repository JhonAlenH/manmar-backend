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
    const formattedList = receipt.recordset
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
    const documentos = await emissionService.documentsContract(req.params.id);

    if (documentos.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: documentos.permissionError
            });
    }

    const documentList = documentos.map(item => ({
        xnombrenota: item.xarchivo,
        xruta: item.xruta,
        xtitulo: item.xtitulo,
    }))

    return res
        .status(200)
        .send({
            status: true,
            data: contratos,
            documents: documentList
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
    const policy = await emissionService.searchPolicy(req.params.xpoliza, req.body.ccedente);
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

const searchComplement = async (req, res) => {
    const complement = await emissionService.searchComplement(req.body);
    if (complement.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: complement.permissionError
            });
    }
    if (complement.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: complement.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            complement: complement
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

const searchDueReceipt = async (req, res) => {
    const receipt = await emissionService.searchDueReceipt();
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
    // Aplicar el filtro distinct por cedente
    const distinctCedentes = receipt.reduce((acc, current) => {
        const xcedenteExists = acc.find(item => item.ccedente === current.ccedente);
        if (!xcedenteExists) {
            acc.push({
                ccedente: current.ccedente,
                xcedente: current.xcedente
            });
        }
        return acc;
    }, []);

    return res
        .status(200)
        .send({
            status: true,
            receipt: receipt,
            cedents: distinctCedentes
        });
}

const updateReceiptPremium = async (req, res) => {
    const update = await emissionService.updateReceiptPremium(req.body);
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

const searchFertilizers = async (req, res) => {
    const abonos = await emissionService.searchFertilizers(req.body);
    if (abonos.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: abonos.permissionError
            });
    }
    if (abonos.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: abonos.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            abonos: abonos
        });
}

const feeCharged = async (req, res) => {
    const fee = await emissionService.feeCharged();
    if (fee.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: fee.permissionError
            });
    }
    if (fee.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: fee.error
            });
    }
    // Aplicar el filtro distinct por cedente
    const distinctCedentes = fee.reduce((acc, current) => {
        const xcedenteExists = acc.find(item => item.ccedente === current.ccedente);
        if (!xcedenteExists) {
            acc.push({
                ccedente: current.ccedente,
                xcedente: current.xcedente
            });
        }
        return acc;
    }, []);

    return res
        .status(200)
        .send({
            status: true,
            fee: fee,
            cedents: distinctCedentes
        });
}

const createComplement = async (req, res) => {
    const create = await emissionService.createComplement(req.body);
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
            message: `Se ha actualizado el recibo exitosamente`
        });
}

const createAbono = async (req, res) => {
    const create = await emissionService.createAbono(req.body);
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
            status_receipt: true,
            message: `Se ha ingresado el abono`
        });
}

const searchDistribution = async (req, res) => {
    const distribucion = await emissionService.searchDistribution(req.body);
    if (distribucion.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: distribucion.permissionError
            });
    }
    if (distribucion.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: distribucion.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            distribucion: distribucion
        });
}

const paymentProductor = async (req, res) => {
    const payment = await emissionService.paymentProductor(req.body);
    if (payment.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: payment.permissionError
            });
    }
    if (payment.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: payment.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            status_receipt: true,
            message: `Se ha ingresado el pago`
        });
}

const paymentEjecutivo = async (req, res) => {
    const payment = await emissionService.paymentEjecutivo(req.body);
    if (payment.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: payment.permissionError
            });
    }
    if (payment.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: payment.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            status_receipt: true,
            message: `Se ha ingresado el pago`
        });
}

const paymentAgente = async (req, res) => {
    const payment = await emissionService.paymentAgente(req.body);
    if (payment.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: payment.permissionError
            });
    }
    if (payment.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: payment.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            status_receipt: true,
            message: `Se ha ingresado el pago`
        });
}

const buscarTarifasDist = async (req, res) => {
    const tarifas = await emissionService.buscarTarifasDist(req.params.id);
    if (tarifas.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: tarifas.permissionError
            });
    }
    if (tarifas.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: tarifas.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            ptasa_p: tarifas.pcomision_p,
            ptasa_e: tarifas.pcomision_e,
            ptasa_a: tarifas.pcomision_a,
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
    paymentEjecutivo,
    paymentAgente,
    buscarTarifasDist
}
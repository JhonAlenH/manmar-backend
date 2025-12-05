import Renovations from '../db/Renovations.js';

const searchRenovations = async (req, res) => {
    const renovations = await Renovations.searchRenovations(req.body);
    if (renovations.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: renovations.permissionError
            });
    }
    if (renovations.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: renovations.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            renovations: renovations
        });
}

const getReceipt = async (req, res) => {
    const receipt = await Renovations.getReceipt(req.body);
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

const getDistribution = async (req, res) => {
    const distribution = await Renovations.getDistribution(req.params.id);
    if (distribution.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: distribution.permissionError
            });
    }
    if (distribution.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: distribution.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            distribution: distribution
        });
}

const createRenovation = async (req, res) => {
    const reanovation = await Renovations.createRenovation(req.body,req.params.id);
    if (reanovation.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: reanovation.permissionError
            });
    }
    if (reanovation.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: reanovation.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            message: `La póliza ${req.body.xpoliza} ha sido renovada correctamente.`
        });
}

export default {
    searchRenovations,
    getReceipt,
    getDistribution,
    createRenovation
}
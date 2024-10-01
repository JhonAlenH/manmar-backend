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

export default {
    searchRenovations
}
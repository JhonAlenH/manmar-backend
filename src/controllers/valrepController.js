import valrepService from '../service/valrepService.js';

const getCedents = async (req, res) => {
    const cedents = await valrepService.getCedents(req.body);
    if (cedents.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: cedents.permissionError
            });
    }
    if (cedents.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: cedents.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                cedents: cedents
            }
        });
}

const getTrade = async (req, res) => {
    const trades = await valrepService.getTrade();
    if (trades.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: trades.permissionError
            });
    }
    if (trades.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: trades.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                trade: trades
            }
        });
}

const getProduct = async (req, res) => {
    const products = await valrepService.getProduct(req.body);
    if (products.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: products.permissionError
            });
    }
    if (products.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: products.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                product: products
            }
        });
}

const getCoins = async (req, res) => {
    const coins = await valrepService.getCoins();
    if (coins.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: coins.permissionError
            });
    }
    if (coins.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: coins.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                coins: coins
            }
        });
}

const getClients = async (req, res) => {
    const clients = await valrepService.getClients();
    if (clients.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: clients.permissionError
            });
    }
    if (clients.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: clients.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                clients: clients
            }
        });
}

const getBrand = async (req, res) => {
    const brand = await valrepService.getBrand(req.body);
    if (brand.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: brand.permissionError
            });
    }
    if (brand.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: brand.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                brand: brand
            }
        });
}

const getModel = async (req, res) => {
    const model = await valrepService.getModel(req.body);
    if (model.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: model.permissionError
            });
    }
    if (model.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: model.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                model: model
            }
        });
}

const getVersion = async (req, res) => {
    const version = await valrepService.getVersion(req.body);
    if (version.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: version.permissionError
            });
    }
    if (version.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: version.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                version: version
            }
        });
}

const getColor = async (req, res) => {
    const color = await valrepService.getColor();
    if (color.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: color.permissionError
            });
    }
    if (color.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: color.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                color: color
            }
        });
}

const getMethodOfPayment = async (req, res) => {
    const payment = await valrepService.getMethodOfPayment();
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
            data: {
                payment: payment
            }
        });
}

const getTakers = async (req, res) => {
    const takers = await valrepService.getTakers();
    if (takers.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: takers.permissionError
            });
    }
    if (takers.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: takers.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                takers: takers
            }
        });
}

const getTakersId = async (req, res) => {
    const takers = await valrepService.getTakersId(req.params.xcedula);
    if (!takers) {
        return res.status(200).send({
          status: true,
        });
    }else{
        return res
        .status(200)
        .send({
            status: true,
            data: {
                ctomador: takers.ctomador,
                xtomador: takers.xtomador,
                xprofesion: takers.xprofesion,
                icedula: takers.icedula,
                xcedula: takers.xcedula,
                xrif: takers.xrif,
                xdomicilio: takers.xdomicilio,
                xpais: takers.xpais,
                xestado: takers.xestado,
                xciudad: takers.xciudad,
                xzona_postal: takers.xzona_postal,
                xdireccion: takers.xdireccion,
                xcorreo: takers.xcorreo,
            }
        });
    }
}

const getState = async (req, res) => {
    const state = await valrepService.getState(req.body);
    if (state.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: state.permissionError
            });
    }
    if (state.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: state.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                state: state
            }
        });
}

const getCity = async (req, res) => {
    const city = await valrepService.getCity(req.body);
    if (city.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: city.permissionError
            });
    }
    if (city.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: city.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                city: city
            }
        });
}

const getExecutive = async (req, res) => {
    const executive = await valrepService.getExecutive();
    if (executive.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: executive.permissionError
            });
    }
    if (executive.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: executive.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                executive: executive
            }
        });
}

const getAgents = async (req, res) => {
    const agents = await valrepService.getAgents(req.params.cejecutivo);
    if (agents.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: agents.permissionError
            });
    }
    if (agents.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: agents.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                agents: agents
            }
        });
}

const getInsurance = async (req, res) => {
    const insurance = await valrepService.getInsurance();
    if (insurance.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: insurance.permissionError
            });
    }
    if (insurance.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: insurance.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                insurance: insurance
            }
        });
}

const getCoverage = async (req, res) => {
    const coverage = await valrepService.getCoverage(req.params.cramo);
    if (coverage.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: coverage.permissionError
            });
    }
    if (coverage.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: coverage.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                coverage: coverage
            }
        });
}

const getBank = async (req, res) => {
    const bank = await valrepService.getBank();
    if (bank.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: bank.permissionError
            });
    }
    if (bank.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: bank.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                bank: bank
            }
        });
}

const getBankProductor = async (req, res) => {
    const productor = await valrepService.getBankProductor(req.body);
    if (productor.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: productor.permissionError
            });
    }
    if (productor.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: productor.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                productor:productor
            }
        });
}
const getDataUser = async (req, res) => {
    const data = await valrepService.getDataUser(req.body);
    if (data.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: data.permissionError
            });
    }
    if (data.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: data.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data
        });
}

export default {
    getCedents,
    getTrade,
    getProduct,
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
    getCity,
    getExecutive,
    getAgents,
    getInsurance,
    getCoverage,
    getBank,
    getBankProductor,
    getDataUser
}
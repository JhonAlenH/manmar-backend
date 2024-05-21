import sql from "mssql";

const sqlConfig = {
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    server: process.env.SERVER_BD,
    database: process.env.NAME_BD,
    requestTimeout: 60000,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const getReceipt = async (getReceipt) => {
    const strPrecio = getReceipt.mprima; // El string que contiene el precio
    const precioNumerico = parseFloat(strPrecio.replace(',', '.')); // Convertir a número con decimales
    try{

        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
        .input('fdesde_pol', sql.DateTime, getReceipt.fdesde)
        .input('fhasta_pol', sql.DateTime, getReceipt.fhasta)
        .input('mprima', sql.Numeric(18, 2), precioNumerico)
        .input('cmetodologiapago', sql.Int, getReceipt.cmetodologiapago)
        .execute('tmBRecibos');
         const receipt= await pool.request()
        .query('select * from tmrecibos');
        await pool.close();
        return receipt
              
    }catch(err){
      console.log(err.message)
        return { error: err.message };
        }
}

export default {
    getReceipt,
}
import sql from "mssql";
import { Sequelize, DataTypes, Op, where } from 'sequelize';
import sequelize from '../config/database.js';
import initModels  from "../models/init-models.js";
const models = initModels(sequelize)

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

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

const emissionsReport = async (data) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let queryWhere = ''
    let date = new Date()
    let label = `Reporte_emisiones(generado_${date.toLocaleDateString('en-GB')})`
    if(!isEmpty(data)) {
      console.log('aqui entro')
      const entries = Object.entries(data)
      queryWhere += ' WHERE '
      label += '-var_('
      let x = 0
      for (const item of entries) {

        if(x != 0){
          queryWhere += ' AND '
          label += '-'
        }
        if(item[0] == 'fdesde'){
          queryWhere += `b.${item[0]} ${item[1]}`
        }
        if(item[0] == 'ccedente'){
          queryWhere += `a.${item[0]} = '${item[1]}'`
        }
        if(item[0] == 'cramo'){
          queryWhere += `a.${item[0]} = '${item[1]}'`
        }
        label += `${item[0]}.${item[1]}`
        x++
      }
      label += ')'
      
    }
    console.log(queryWhere)
    let queryInitial = `
      SELECT 
      a.xpoliza, a.cpoliza,
      b.fdesde, b.fhasta,
      d.cci_rif cci_rif_asegurado, CONCAT(d.xnombre,' ',d.xapellido) xasegurado, 
      e.cci_rif cci_rif_tomador, CONCAT(d.xnombre,' ',e.xapellido) xtomador,
      (select top(1) xramo from maramos where cramo = (select top(1) cramo from maproductos where cproducto = b.cproducto)) xramo,
      CONCAT((select max(ncuota) from cbrecibos where cvigencia = b.cvigencia and iestadorec = 'C'), '/', (select max(ncuota) from cbrecibos where cvigencia = b.cvigencia)) ncuotas_pagadas,
      (select top(1) mprimaext from cbrecibos where cvigencia = b.cvigencia) monto_individual_ext,
      (select top(1) mprima from cbrecibos where cvigencia = b.cvigencia) monto_individual,
      b.mprimaext monto_total_emision_ext,
      b.mprima monto_total_emision,
      (select sum(mprimaext) from cbrecibos where cvigencia = b.cvigencia) monto_total_actual_ext,
      (select sum(mprima) from cbrecibos where cvigencia = b.cvigencia) monto_total_actual,
      (select sum(mprimaext) from cbrecibos where cvigencia = b.cvigencia and fcobro is not null) prima_pagada_ext,
      (select sum(mprima) from cbrecibos where cvigencia = b.cvigencia and fcobro is not null) prima_pagada
      from popolizas a
      inner join povigencias b on a.cpoliza = b.cpoliza
      inner join mapersonas d on a.casegurado = d.cpersona
      inner join mapersonas e on a.ctomador = e.cpersona
    `
    let result = await pool.request().query(queryInitial + queryWhere)
    await pool.close();

    const formatResult = await result.recordset.map(item => {
      return {
        "Nombre del Tomador": item.xtomador.replace('NULL','').trim(),
        "C.I del Tomador": item.cci_rif_tomador.trim(),
        "Nombre del Titular": item.xasegurado.replace('NULL','').trim(),
        "C.I del Titular": item.cci_rif_asegurado.trim(),
        "Nº de Póliza": item.xpoliza.trim(),
        "Vigencia Desde": item.fdesde.toLocaleDateString('en-GB'),
        "Vigencia Hasta": item.fhasta.toLocaleDateString('en-GB'),
        "Ramo": item.xramo.trim(),
        "Monto Emision (Bs.)": item.monto_total_emision || 0,
        "Monto Emision ($)": item.monto_total_emision_ext || 0,
        "Monto Total (Bs.)": item.monto_total_actual || 0,
        "Monto Total ($)": item.monto_total_actual_ext || 0,
        "Monto Cuota (Bs.)": item.monto_individual,
        "Monto Cuota ($)": item.monto_individual_ext,
        "Nº de Cuotas Pagadas": item.ncuotas_pagadas || 0,
        "Monto Pagado (Bs.)": item.prima_pagada || 0,
        "Monto Pagado ($)": item.prima_pagada_ext || 0,
      }
    })
    return {data: formatResult, label}
  } catch (error) {
    console.log(error)
    return { error: await error.parent.message };
  }
};

export default {
  emissionsReport
}
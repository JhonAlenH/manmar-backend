import sql from "mssql";
import { Sequelize, Op } from 'sequelize';
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

  const Producers = models.maproductores

  const Tariffs = models.maproductos;


  

  const Abonos = sequelize.define('cbmovimientos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
  }, {tableName: 'cbmovimientos'});

  const Distribution = sequelize.define('cbVmovimientos', {
    ncuota: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
  }, {tableName: 'cbVmovimientos'});


  const Recibos = models.cbrecibos;
  const Comisiones = models.cbcomisiones;
  const Complement = models.cbmovimientos;
  const Documentos = models.podocumentos;
  const Products = models.maproductos;
  const Polizas = models.popolizas;
  const Policy = models.popolizas
  const Contracts = models.povigencias

  const getReceipt = async (data) => {
    console.log(data)
    const strPrecio = data.mprima || '0,00'; // El string que contiene el precio
    const precioNumerico = parseFloat(strPrecio.replace(',', '.')); // Convertir a número con decimales
    try {
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request()
      .input('fdesde_pol', sql.DateTime, data.fdesde)
      .input('fhasta_pol', sql.DateTime, data.fhasta)
      .input('mprima', sql.Numeric(18, 2), precioNumerico)
      .input('pcomision', sql.Numeric(18, 2), data.pcomision)
      .input('cmetodologiapago', sql.Int, data.cmetodologiapago)
      .execute('tmBRecibos');
      const receipt= await pool.request()
      .query('select * from tmrecibos');
      await pool.close();
      return receipt       
    } catch(err){
      console.log(err.message)
      return { error: err.message };
    }
  }

  const getReceiptUpdate = async (getReceiptUpdate) => {
    const strPrecio = getReceiptUpdate.mprima; // El string que contiene el precio
    const precioNumerico = parseFloat(strPrecio.replace(',', '.')); // Convertir a número con decimales
    try{
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
        .input('id', sql.Int, getReceiptUpdate.id)
        .input('mmonto', sql.Numeric(18, 2), precioNumerico)
        .input('fdesde', sql.DateTime, getReceiptUpdate.fdesde)
        .execute('pobconsulta_prima');
        const receipt= await pool.request()
        .query('select * from tmconsulta_prima');
        await pool.close();
        return receipt
              
    }catch(err){
      console.log(err.message)
        return { error: err.message };
        }
}

  const getProducers = async () => {
    try {
      const producers = await Producers.findOne({
        attributes: ['cproductor', 'xproductor', 'pcomision'],
      });
      return producers ? producers.get({ plain: true }) : {};;
    } catch (error) {
      return { error: error.message };
    }
  };

  const getTariffs = async (data) => {
    try {
      const tariffs = await Products.findOne({
        where:{cproducto: data.id},
        attributes: ['pcomision'],
      });
      return tariffs ? tariffs.get({ plain: true }) : {};;
    } catch (error) {
      return { error: error.message };
    }
  };

  const searchContract = async (data) => {
    try {
      const whereClause = {};
      if (data.ccedente) {
        whereClause.ccedente = data.ccedente;
      }
      if (data.cramo) {
        whereClause.cramo = data.cramo;
      }
      
      const contratos = await Policy.findAll({
        where: whereClause,
        attributes: ['cpoliza', 'xpoliza'],
        include: [
          {
            association: 'vigencias',
            order: [['fdesde', 'desc']]
          },
          'ramo',
          'asegurado',
          {
            association: 'cedente',
            include: ['persona'],
          },
          'tomador',
        ]
      });
  
      const contracts = contratos.map((item) => item.get({ plain: true }));
      return contracts;
    } catch (error) {
      console.log(error)
      return { error: error.message };
    }
  };

  const createContract = async (data) => {
    try {
      const documentos = data.documentos || [];
      console.log(data)
      const policy = await Polizas.create(data)
      console.log('datos poliza cre')

      for (const vigencia of data.vigencias) {
        const contract = await Contracts.create({...vigencia, cpoliza: policy.cpoliza})
        console.log('poliza cre')
        for (const recibo of vigencia.recibos) {
          const receipt = await Recibos.create({...recibo, cvigencia: contract.cvigencia})
          console.log('recibo cre')
          for (const comision of recibo.comisiones) {
            const comitt = await Comisiones.create({...comision, crecibo: receipt.crecibo})
            console.log('comision cre')
          }
        }
      }
      if (policy && data.documentos.length > 0) {
        for (const document of documentos) {
          Documentos.create({
            ...document,
            itipo: 'P',
            ccodigo: policy.polizas[0].cvigencia,
          })
        }
      }
  
      return policy;
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
  };

  const detailContract = async (id) => {
    try {
      const contract = await Policy.findOne({
        where: {
          cpoliza: id
        },
        attributes: [
          'cpoliza', 'xpoliza', 'iestado', 'fcreacion',
        ],
        include: [
          {
            association: 'cedente', attributes: ['ccedente'],
            include: [{association: 'persona', attributes: ['xnombre']}],
          },
          {
            association: 'vigencias', attributes: [
              'cvigencia', 'mprimaext', 'mprima', 'msumaext', 'msuma', 'fdesde', 'fhasta','iestado',
            ], order: [['fdesde', 'DESC']],
            include: [
              {
                association: 'producto', attributes: ['cproducto', 'xproducto', 'pcomision'],
                include: [
                  {association: 'ramo', attributes: ['cramo', 'xramo']},
                ]
              },
              {association: 'recibos', attributes: [
                'crecibo', 'ncuota', 'iestadorec', 'fcobro', 'mprimaext', 'mprima', 'pcomision', 'mcomisionext','mcomision','fdesde_rec', 'fhasta_rec', 'iestadorec'
              ]},
              {association: 'metodologia_pago', attributes: ['cmetodologiapago', 'xmetodologiapago']},
              {association: 'moneda', attributes: ['cmoneda', 'xmoneda', 'xrepresentacion']},
            ]
          },
          {association: 'asegurado', attributes: ['cpersona', 'cci_rif','xnombre', 'xapellido']},
          {association: 'tomador', attributes: ['cpersona', 'cci_rif','xnombre', 'xapellido']},
          {
            association: 'productor', attributes: ['cproductor'],
            include: [{
              association: 'usuario', attributes: ['cusuario'],
              include: [
                {association: 'persona',  attributes: ['xnombre']}
              ]
            }],
          },
        ]
      });
      return contract ? contract.get({ plain: true }) : {};;
    } catch (error) {
      return { error: error.message };
    }
  };

  const documentsContract = async (id) => {
    try {
      const documentos = await Documentos.findAll({
        where: {
          itipo: 'P',
          ccodigo: id
        },
        attributes: [
          'xtitulo', 'xruta', 'xarchivo'
        ],
      });
      const documents = documentos.map((item) => item.get({ plain: true }));
      return documents
    } catch (error) {
      return { error: error.message };
    }
  };

  const updateContract = async (data) => {
    let pool;
    try {
        pool = await sql.connect(sqlConfig);
        const keys = Object.keys(data).filter(key => key !== 'id');

        // Construir la cláusula SET
        const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');

        const query = `UPDATE povigencias SET ${setClause} WHERE cvigencia = @id`;

        const updateRequest = pool.request();

        // Asignar los valores correspondientes desde data
        keys.forEach((key, index) => {
            updateRequest.input(`param${index + 1}`, data[key]);
        });
        updateRequest.input('id', data.id);

        const update = await updateRequest.query(query);

        // Actualizar solo ccedente en cbrecibos
        const updateCbrecibosQuery = `UPDATE cbrecibos SET ccedente = @ccedente WHERE cvigencia = @id`;

        const updateRequestCbrecibos = pool.request();
        updateRequestCbrecibos.input('ccedente', data.ccedente);
        updateRequestCbrecibos.input('id', data.id);

        // Ejecutar la actualización en cbrecibos
        await updateRequestCbrecibos.query(updateCbrecibosQuery);

        return update;
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    } finally {
        if (pool) {
            await pool.close();
        }
    }
  };

const searchPolicy = async (xpoliza, ccedente) => {
  try {
    const data = {
      xpoliza: xpoliza,
      ccedente: ccedente
    }
    const producers = await Policy.findOne({
      where: data,
      attributes: ['xpoliza'],
    });
    return producers ? producers.get({ plain: true }) : {};;
  } catch (error) {
    return { error: error.message };
  }
};

const searchReceipt = async (id) => {
  try {
    const recibos = await Recibos.findAll({
      where:{ cvigencia: id},
      attributes: ['ncuota', 'fdesde_rec', 'fhasta_rec', 'mprimaext', 'fcobro', 'cvigencia', 'mcomisionext',
        'fcobro', 'iestadorec', 'crecibo'
      ],
    });
    const receipt = recibos.map((item) => item.get({ plain: true }));
    return receipt
  } catch (error) {
    return { error: error.message };
  }
};

const searchComplement = async (data) => {
  try {
    const complementos = await Complement.findAll({
      where:{ 
        cvigencia: data.cvigencia,
        crecibo: data.crecibo,
        itipomov: 'C'
      },
      attributes: ['fmovimiento', 'mpagado', 'crecibo', 'cvigencia', 'xruta_tipomov'],
    });
    const complement = complementos.map((item) => item.get({ plain: true }));
    return complement
  } catch (error) {
    return { error: error.message };
  }
};

const updateReceipt = async (data) => {
  let pool;
  try {
      pool = await sql.connect(sqlConfig);
      if (Array.isArray(data.recibos) && data.recibos.length > 0) {
        await Promise.all(data.recibos.map(async (recibos) => {
          const keys = Object.keys(recibos).filter(key => 
            key !== 'cvigencia' &&
            key !== 'nrecibo'
          );
          const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
      
          const queryUpdate = `UPDATE cbrecibos SET ${setClause} WHERE cvigencia = @cvigencia AND nrecibo = @nrecibo`;
      
          const updateRequest = pool.request();
          keys.forEach((key, index) => {
              const value = recibos[key] === '' ? null : recibos[key];
              updateRequest.input(`param${index + 1}`, value);
          });
          updateRequest.input('cvigencia', recibos.cvigencia);
          updateRequest.input('nrecibo', recibos.nrecibo);
      
          await updateRequest.query(queryUpdate);
        }));

        // Retorna un mensaje de éxito o algún objeto si todo fue bien
        return { message: 'Actualización exitosa' };
      } else {
        // Retorna un mensaje indicando que no se realizó ninguna actualización
        return { message: 'No se realizaron actualizaciones' };
      }
  } catch (error) {
      console.error(error.message);
      return { error: error.message };
  } finally {
      if (pool) {
          await pool.close();
      }
  }
};

const searchDueReceipt = async () => {
  try {
    // Conectar al pool
    let pool = await sql.connect(sqlConfig);

    // Ejecutar la consulta
    let result = await pool.request()
      .query(`SELECT * FROM cbVrecibos where fcobro is null and iestadorec = 'C'`);

    // Extraer los registros
    const receipt = result.recordset;

    return receipt;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

const updateReceiptPremium = async (data) => {
  let pool;
  try {
      pool = await sql.connect(sqlConfig);
      const keys = Object.keys(data).filter(key => 
        key !== 'id_poliza' &&
        key !== 'nrecibo');

      // Construir la cláusula SET
      const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');

      const query = `UPDATE cbrecibos SET ${setClause} WHERE id_poliza = @id_poliza and nrecibo = @nrecibo`;

      const updateRequest = pool.request();

      // Asignar los valores correspondientes desde data
      keys.forEach((key, index) => {
          updateRequest.input(`param${index + 1}`, data[key]);
      });
      updateRequest.input('id_poliza', data.id_poliza);
      updateRequest.input('nrecibo', data.nrecibo);

      const update = await updateRequest.query(query);

      return update;
  } catch (error) {
      console.error(error.message);
      return { error: error.message };
  } finally {
      if (pool) {
          await pool.close();
      }
  }
};

const searchFertilizers = async (searchFertilizers) => {
  try {
    const fer = await Abonos.findAll({
      where:{ 
        id_poliza: searchFertilizers.id_poliza,
        crecibo: searchFertilizers.crecibo,
        itipomov: 'A'
      },
      attributes: ['fmovimiento', 'mpagado', 'id_poliza', 'crecibo', 'xruta_tipomov'],
    });
    const abonos = fer.map((item) => item.get({ plain: true }));
    console.log(abonos)
    return abonos
  } catch (error) {
    return { error: error.message };
  }
};

const feeCharged = async () => {
  try {
    // Conectar al pool
    let pool = await sql.connect(sqlConfig);

    // Ejecutar la consulta
    let result = await pool.request()
      .query(`SELECT * FROM cbVrecibos where fcobro is not null`);

    // Extraer los registros
    const fee = result.recordset;

    return fee;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

const createComplement = async (data) => {
  try {
    // Conectar al pool
    let pool = await sql.connect(sqlConfig);

    if (Array.isArray(data.complemento) && data.complemento.length > 0) {
      await Promise.all(data.complemento.map(async (complemento) => {
        // Verifica que complemento no es null y es un objeto plano (no un array)
        if (complemento && typeof complemento === 'object' && !Array.isArray(complemento)) { 
          const complementoKeys = Object.keys(complemento).filter(key => complemento[key] !== undefined);
          const complementoValues = complementoKeys.map(key => complemento[key] === '' ? null : complemento[key]);

          // Paso 1: Hacer el SELECT para obtener ncuota
          const { crecibo, id_poliza } = complemento; // Asegúrate de que 'crecibo' e 'id_poliza' estén en 'complemento'
          const selectQuery = 'SELECT max(ncuota) as ncuota FROM cbmovimientos WHERE crecibo = @crecibo AND id_poliza = @id_poliza';
          const selectResult = await pool.request()
            .input('crecibo', crecibo)
            .input('id_poliza', id_poliza)
            .query(selectQuery);

          // Paso 2: Verificar si se encontraron registros y asignar ncuota
          let ncuota = 1; // Valor predeterminado si no hay registros
          if (selectResult.recordset.length > 0) {
            ncuota = selectResult.recordset[0].ncuota + 1; // Si hay registros, sumar 1 a ncuota
          }

          // Paso 3: Preparar y filtrar los datos de complemento para el INSERT en cbmovimientos
          const movKeys = Object.keys(complemento).filter(key => complemento[key] !== undefined && complemento[key] !== '');
          const movValues = movKeys.map(key => complemento[key]);

          const movRequest = pool.request();

          // Genera los placeholders y añade ncuota
          const movPlaceholders = movKeys.map((_, i) => `@param${i + 1}`).join(',');
          const movQuery = `INSERT INTO cbmovimientos (${movKeys.join(',')}, ncuota) VALUES (${movPlaceholders}, @ncuota)`;

          // Añade los parámetros al request
          movKeys.forEach((key, index) => {
            movRequest.input(`param${index + 1}`, movValues[index]);
          });
          movRequest.input('ncuota', ncuota);

          // Ejecuta el INSERT en cbmovimientos
          await movRequest.query(movQuery);
        } else {
          console.warn("Elemento 'complemento' no válido:", complemento);
        }
      }));
    }

    return { success: true, message: 'Insert completed successfully' };

  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};

const createAbono = async (createAbono) => {
  let pool = await sql.connect(sqlConfig);
  try {
    const { crecibo, id_poliza } = createAbono;

    // Paso 1: Hacer el SELECT para obtener ncuota
    const selectQuery = 'SELECT max(ncuota) as ncuota FROM cbmovimientos WHERE crecibo = @crecibo AND id_poliza = @id_poliza';
    const selectResult = await pool.request()
      .input('crecibo', crecibo)
      .input('id_poliza', id_poliza)
      .query(selectQuery);

    // Paso 2: Verificar si se encontraron registros y asignar ncuota
    let ncuota = 1; // Valor predeterminado si no hay registros
    if (selectResult.recordset.length > 0) {
      ncuota = selectResult.recordset[0].ncuota + 1; // Si hay registros, sumar 1 a ncuota
    }

    // Paso 3: Preparar y filtrar los datos de createAbono para el INSERT
    const keys = Object.keys(createAbono).filter(key => createAbono[key] !== undefined && createAbono[key] !== '');

    if (keys.length === 0) {
      throw new Error('No hay datos válidos para insertar.');
    }

    const values = keys.map(key => createAbono[key]);

    const request = pool.request();

    // Genera los placeholders y añade ncuota
    const placeholders = keys.map((_, i) => `@param${i + 1}`).join(',');
    const query = `INSERT INTO cbmovimientos (${keys.join(',')}, ncuota) VALUES (${placeholders}, @ncuota)`;

    // Añade los parámetros al request
    keys.forEach((key, index) => {
      request.input(`param${index + 1}`, values[index]);
    });
    request.input('ncuota', ncuota);

    // Ejecuta el INSERT
    const result = await request.query(query);
    return result;
  } catch (error) {
    console.error('Error al insertar abonos:', error.message);
    return { error: error.message };
  } finally {
    // Cierra la conexión para evitar fugas de recursos
    pool.close();
  }
};

const searchDistribution = async (searchDistribution) => {
  try {
    const dist = await Distribution.findAll({
      where: { 
        fmovimiento: {
          [Op.gte]: searchDistribution.fdesde, // Mayor o igual a fdesde
          [Op.lte]: searchDistribution.fhasta  // Menor o igual a fhasta
        },
        ccedente: searchDistribution.ccedente
      },
      attributes: [
        'crecibo',               // Recibo
        'ncuota',                // Número de cuota
        'id_poliza',             // ID de la póliza
        'itipomov',              // Tipo de movimiento
        'fmovimiento',           // Fecha de movimiento
        'mcomision_p',           // Comisión del productor
        'mcomision_e',           // Comisión del ejecutivo
        'mcomision_a',           // Comisión del agente
        'fpago_p',               // Fecha de pago productor
        'fpago_e',               // Fecha de pago ejecutivo
        'fpago_a',               // Fecha de pago agente
        'mcomision_pext',        // Comisión externa productor
        'mcomision_eext',        // Comisión externa ejecutivo
        'mcomision_aext',        // Comisión externa agente
        'ccedente',              // Cedente
        'ctomador',              // Código del tomador
        'xpoliza',               // Nombre de la póliza
        'xtomador',              // Nombre del tomador
        'cproductor',            // Código del Productor
        'cejecutivo',            // Código del Ejecutivo
        'cagente',               // Código del Agente
        'xproductor',            // Nombre del Productor
        'xejecutivo',            // Nombre del Ejecutivo
        'xagente',               // Nombre del Agente
        'xcedente',              // Nombre del Cedente
        'mcomision',             // Comisión Bolívares
        'mcomisionext',          // Comisión Dólares
      ],
    });

    const distribucion = dist.map((item) => item.get({ plain: true }));
    return distribucion;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const paymentProductor = async (data) => {
  try {
    if (Array.isArray(data.productores) && data.productores.length > 0) {
      for (const productores of data.productores) {
        let pool = await sql.connect(sqlConfig);

        const keys = Object.keys(productores).filter(key => 
          key !== 'id_poliza' &&
          key !== 'crecibo' &&
          key !== 'ncuota' &&
          key !== 'xproductor' &&
          key !== 'xejecutivo' &&
          key !== 'xagente' &&
          key !== 'cproductor' &&
          key !== 'cejecutivo' &&
          key !== 'cagente' &&
          key !== 'itipomov' &&
          key !== 'fmovimiento' &&
          key !== 'mcomision_p' &&
          key !== 'mcomision_e' &&
          key !== 'mcomision_a'
        );

        const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');

        const queryUpdate = `
          UPDATE cbmovimientos
          SET ${setClause}
          WHERE id_poliza = @id_poliza 
            AND crecibo = @crecibo 
            AND ncuota = @ncuota 
            AND fpago_p IS NULL`;

        const updateRequest = pool.request();
        keys.forEach((key, index) => {
          const value = productores[key] === '' ? null : productores[key];
          updateRequest.input(`param${index + 1}`, value);
        });
        updateRequest.input('id_poliza', productores.id_poliza);
        updateRequest.input('crecibo', productores.crecibo);
        updateRequest.input('ncuota', productores.ncuota);

        await updateRequest.query(queryUpdate);
        await pool.close(); // Cerrar conexión
      }

      return { message: 'Actualización exitosa' };
    } else {
      return { message: 'No se realizaron actualizaciones' };
    }
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

const paymentEjecutivo = async (data) => {
  let pool;
  try {
      pool = await sql.connect(sqlConfig);
      if (Array.isArray(data.ejecutivos) && data.ejecutivos.length > 0) {
        for (const ejecutivos of data.ejecutivos) {
          let pool = await sql.connect(sqlConfig);
  
          const keys = Object.keys(ejecutivos).filter(key => 
            key !== 'id_poliza' &&
            key !== 'crecibo' &&
            key !== 'ncuota' &&
            key !== 'xproductor' &&
            key !== 'xejecutivo' &&
            key !== 'xagente' &&
            key !== 'cproductor' &&
            key !== 'cejecutivo' &&
            key !== 'cagente' &&
            key !== 'itipomov' &&
            key !== 'fmovimiento' &&
            key !== 'mcomision_p' &&
            key !== 'mcomision_e' &&
            key !== 'mcomision_a' &&
            key !== 'mcomisionext' &&
            key !== 'xcedente' &&
            key !== 'xtomador' &&
            key !== 'xpoliza' &&
            key !== 'ctomador' 
          );
  
          const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
  
          const queryUpdate = `
            UPDATE cbmovimientos
            SET ${setClause}
            WHERE id_poliza = @id_poliza 
              AND crecibo = @crecibo 
              AND ncuota = @ncuota 
              AND fpago_e IS NULL`;
  
          const updateRequest = pool.request();
          keys.forEach((key, index) => {
            const value = ejecutivos[key] === '' ? null : ejecutivos[key];
            updateRequest.input(`param${index + 1}`, value);
          });
          updateRequest.input('id_poliza', ejecutivos.id_poliza);
          updateRequest.input('crecibo', ejecutivos.crecibo);
          updateRequest.input('ncuota', ejecutivos.ncuota);
  
          await updateRequest.query(queryUpdate);
          await pool.close(); // Cerrar conexión
        }

        return { message: 'Actualización exitosa' };
      } else {
        // Retorna un mensaje indicando que no se realizó ninguna actualización
        return { message: 'No se realizaron actualizaciones' };
      }
  } catch (error) {
      console.error(error.message);
      return { error: error.message };
  } finally {
      if (pool) {
          await pool.close();
      }
  }
};

const paymentAgente = async (data) => {
  let pool;
  try {
      pool = await sql.connect(sqlConfig);
      if (Array.isArray(data.agentes) && data.agentes.length > 0) {
        for (const agentes of data.agentes) {
          let pool = await sql.connect(sqlConfig);
          const keys = Object.keys(agentes).filter(key => 
            key !== 'id_poliza' &&
            key !== 'crecibo' &&
            key !== 'ncuota' &&
            key !== 'xproductor' &&
            key !== 'xejecutivo' &&
            key !== 'xagente' &&
            key !== 'cproductor' &&
            key !== 'cejecutivo' &&
            key !== 'cagente' &&
            key !== 'itipomov' &&
            key !== 'fmovimiento' &&
            key !== 'mcomision_p' &&
            key !== 'mcomision_e' &&
            key !== 'mcomision_a' &&
            key !== 'mcomisionext' &&
            key !== 'xcedente' &&
            key !== 'xtomador' &&
            key !== 'xpoliza' &&
            key !== 'ctomador' 
          );
  
          const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
  
          const queryUpdate = `
            UPDATE cbmovimientos
            SET ${setClause}
            WHERE id_poliza = @id_poliza 
              AND crecibo = @crecibo 
              AND ncuota = @ncuota 
              AND fpago_a IS NULL`;
  
          const updateRequest = pool.request();
          keys.forEach((key, index) => {
            const value = agentes[key] === '' ? null : agentes[key];
            updateRequest.input(`param${index + 1}`, value);
          });
          updateRequest.input('id_poliza', agentes.id_poliza);
          updateRequest.input('crecibo', agentes.crecibo);
          updateRequest.input('ncuota', agentes.ncuota);
  
          await updateRequest.query(queryUpdate);
          await pool.close(); // Cerrar conexión
        }

        return { message: 'Actualización exitosa' };
      } else {
        // Retorna un mensaje indicando que no se realizó ninguna actualización
        return { message: 'No se realizaron actualizaciones' };
      }
  } catch (error) {
      console.error(error.message);
      return { error: error.message };
  } finally {
      if (pool) {
          await pool.close();
      }
  }
};

const buscarTarifasDist = async (id) => {
  try {
    const tarifas = await Tarifas.findOne({
      where: {id},
      attributes: ['pcomision_p', 'pcomision_e', 'pcomision_a'],
    });
    return tarifas ? tarifas.get({ plain: true }) : {};;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

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
    paymentEjecutivo,
    paymentAgente,
    buscarTarifasDist
}
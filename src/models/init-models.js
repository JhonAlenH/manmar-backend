import _sequelize, { Sequelize } from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _adfdcaja from  "./adfdcaja.js";
import _adpresupuesto from  "./adpresupuesto.js";
import _auoperaciones from  "./auoperaciones.js";
import _cbcierre from  "./cbcierre.js";
import _cbcomisiones from  "./cbcomisiones.js";
import _cbmovientos_cbcomisiones from  "./cbmovientos_cbcomisiones.js";
import _cbmovimientos from  "./cbmovimientos.js";
import _cbrecibos from  "./cbrecibos.js";
import _insconfig from  "./insconfig.js";
import _maaranceles from  "./maaranceles.js";
import _maasegurados from  "./maasegurados.js";
import _mabancos from  "./mabancos.js";
import _macedentes from  "./macedentes.js";
import _macedentes_maproductores from  "./macedentes_maproductores.js";
import _maciudades from  "./maciudades.js";
import _macoberturas from  "./macoberturas.js";
import _macolores from  "./macolores.js";
import _macontadores from  "./macontadores.js";
import _madatos_bancarios from  "./madatos_bancarios.js";
import _madatos_poliza from  "./madatos_poliza.js";
import _maestados from  "./maestados.js";
import _mainma from  "./mainma.js";
import _maintermediarios from  "./maintermediarios.js";
import _mametodologiapago from  "./mametodologiapago.js";
import _mamonedas from  "./mamonedas.js";
import _mapaises from  "./mapaises.js";
import _mapersonas from  "./mapersonas.js";
import _maprocesos from  "./maprocesos.js";
import _maproductores from  "./maproductores.js";
import _maproductos from  "./maproductos.js";
import _maramos from  "./maramos.js";
import _matipo_intermediario from  "./matipo_intermediario.js";
import _matipo_produc from  "./matipo_produc.js";
import _matomadores from  "./matomadores.js";
import _podocumentos from  "./podocumentos.js";
import _popolizas from  "./popolizas.js";
import _popolizas_autos from  "./popolizas_autos.js";
import _seconfig from  "./seconfig.js";
import _semenu from  "./semenu.js";
import _semenuconfig from  "./semenuconfig.js";
import _serol from  "./serol.js";
import _serol_sesubmenu from  "./serol_sesubmenu.js";
import _sesubmenu from  "./sesubmenu.js";
import _seusuarios from  "./seusuarios.js";
import _tmResumen_Pago from  "./tmResumen_Pago.js";
import _tmcmesan from  "./tmcmesan.js";
import _tmconsulta_prima from  "./tmconsulta_prima.js";
import _tmrecibos from  "./tmrecibos.js";
import _tmsuscripcion_polizas from  "./tmsuscripcion_polizas.js";

export default function initModels(sequelize) {

  Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  // Return date in YYYY-MM-DD HH:mm:ss.SSS format, without the timezone offset
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};
  
  const adfdcaja = _adfdcaja.init(sequelize, DataTypes);
  const adpresupuesto = _adpresupuesto.init(sequelize, DataTypes);
  const auoperaciones = _auoperaciones.init(sequelize, DataTypes);
  const cbcierre = _cbcierre.init(sequelize, DataTypes);
  const cbcomisiones = _cbcomisiones.init(sequelize, DataTypes);
  const cbmovientos_cbcomisiones = _cbmovientos_cbcomisiones.init(sequelize, DataTypes);
  const cbmovimientos = _cbmovimientos.init(sequelize, DataTypes);
  const cbrecibos = _cbrecibos.init(sequelize, DataTypes);
  const insconfig = _insconfig.init(sequelize, DataTypes);
  const maaranceles = _maaranceles.init(sequelize, DataTypes);
  const maasegurados = _maasegurados.init(sequelize, DataTypes);
  const mabancos = _mabancos.init(sequelize, DataTypes);
  const macedentes = _macedentes.init(sequelize, DataTypes);
  const macedentes_maproductores = _macedentes_maproductores.init(sequelize, DataTypes);
  const maciudades = _maciudades.init(sequelize, DataTypes);
  const macoberturas = _macoberturas.init(sequelize, DataTypes);
  const macolores = _macolores.init(sequelize, DataTypes);
  const macontadores = _macontadores.init(sequelize, DataTypes);
  const madatos_bancarios = _madatos_bancarios.init(sequelize, DataTypes);
  const madatos_poliza = _madatos_poliza.init(sequelize, DataTypes);
  const maestados = _maestados.init(sequelize, DataTypes);
  const mainma = _mainma.init(sequelize, DataTypes);
  const maintermediarios = _maintermediarios.init(sequelize, DataTypes);
  const mametodologiapago = _mametodologiapago.init(sequelize, DataTypes);
  const mamonedas = _mamonedas.init(sequelize, DataTypes);
  const mapaises = _mapaises.init(sequelize, DataTypes);
  const mapersonas = _mapersonas.init(sequelize, DataTypes);
  const maprocesos = _maprocesos.init(sequelize, DataTypes);
  const maproductores = _maproductores.init(sequelize, DataTypes);
  const maproductos = _maproductos.init(sequelize, DataTypes);
  const maramos = _maramos.init(sequelize, DataTypes);
  const matipo_intermediario = _matipo_intermediario.init(sequelize, DataTypes);
  const matipo_produc = _matipo_produc.init(sequelize, DataTypes);
  const matomadores = _matomadores.init(sequelize, DataTypes);
  const podocumentos = _podocumentos.init(sequelize, DataTypes);
  const popolizas = _popolizas.init(sequelize, DataTypes);
  const popolizas_autos = _popolizas_autos.init(sequelize, DataTypes);
  const seconfig = _seconfig.init(sequelize, DataTypes);
  const semenu = _semenu.init(sequelize, DataTypes);
  const semenuconfig = _semenuconfig.init(sequelize, DataTypes);
  const serol = _serol.init(sequelize, DataTypes);
  const serol_sesubmenu = _serol_sesubmenu.init(sequelize, DataTypes);
  const sesubmenu = _sesubmenu.init(sequelize, DataTypes);
  const seusuarios = _seusuarios.init(sequelize, DataTypes);
  const tmResumen_Pago = _tmResumen_Pago.init(sequelize, DataTypes);
  const tmcmesan = _tmcmesan.init(sequelize, DataTypes);
  const tmconsulta_prima = _tmconsulta_prima.init(sequelize, DataTypes);
  const tmrecibos = _tmrecibos.init(sequelize, DataTypes);
  const tmsuscripcion_polizas = _tmsuscripcion_polizas.init(sequelize, DataTypes);

  maprocesos.belongsTo(auoperaciones, { as: "operaciones", foreignKey: "id"});
  auoperaciones.hasOne(maprocesos, { as: "proceso", foreignKey: "id"});
  cbcomisiones.belongsTo(cbmovimientos, { as: "movimiento", foreignKey: "cmovimiento"});
  cbmovimientos.hasMany(cbcomisiones, { as: "comisiones", foreignKey: "cmovimiento"});
  cbrecibos.belongsTo(cbmovimientos, { as: "movimiento", foreignKey: "cmovimiento"});
  cbmovimientos.hasMany(cbrecibos, { as: "recibos", foreignKey: "cmovimiento"});
  cbcomisiones.belongsTo(cbrecibos, { as: "crecibo_cbrecibo", foreignKey: "crecibo"});
  cbcomisiones.belongsTo(cbrecibos, { as: "recibo", foreignKey: "crecibo"});
  cbrecibos.hasMany(cbcomisiones, { as: "comisiones", foreignKey: "crecibo"});
  madatos_bancarios.belongsTo(mabancos, { as: "banco", foreignKey: "cbanco"});
  mabancos.hasMany(madatos_bancarios, { as: "datos_bancarios", foreignKey: "cbanco"});
  mabancos.belongsTo(mamonedas, { as: "moneda", foreignKey: "cmoneda"});
  mamonedas.hasMany(mabancos, { as: "bancos", foreignKey: "cmoneda"});
  mabancos.belongsTo(mapaises, { as: "pais", foreignKey: "cpais"});
  mapaises.hasOne(mabancos, { as: "bancos", foreignKey: "cpais"});
  madatos_poliza.belongsTo(macedentes, { as: "cedente", foreignKey: "ccedente"});
  macedentes.hasMany(madatos_poliza, { as: "datos_polizas", foreignKey: "ccedente"});
  maproductos.belongsTo(macedentes, { as: "cedente", foreignKey: "ccedente"});
  macedentes.hasMany(maproductos, { as: "productos", foreignKey: "ccedente"});
  maproductos.belongsTo(maramos, { as: "ramo", foreignKey: "cramo"});
  maramos.hasMany(maproductos, { as: "productos", foreignKey: "cramo"});
  mapersonas.belongsTo(maciudades, { as: "ciudad", foreignKey: "cciudad"});
  maciudades.hasMany(mapersonas, { as: "personas", foreignKey: "cciudad"});
  maproductores.belongsTo(madatos_bancarios, { as: "datos_bancarios", foreignKey: "cdatos_bancarios"});
  madatos_bancarios.hasOne(maproductores, { as: "productor", foreignKey: "cdatos_bancarios"});
  popolizas.belongsTo(madatos_poliza, { as: "datos_poliza", foreignKey: "cdatos_poliza"});
  madatos_poliza.hasMany(popolizas, { as: "polizas", foreignKey: "cdatos_poliza"});
  maciudades.belongsTo(maestados, { as: "estado", foreignKey: "cestado"});
  maestados.hasMany(maciudades, { as: "ciudades", foreignKey: "cestado"});
  popolizas.belongsTo(mametodologiapago, { as: "metodologia_pago", foreignKey: "cmetodologiapago"});
  mametodologiapago.hasMany(popolizas, { as: "polizas", foreignKey: "cmetodologiapago"});
  cbcomisiones.belongsTo(mamonedas, { as: "moneda", foreignKey: "cmoneda"});
  mamonedas.hasMany(cbcomisiones, { as: "comisiones", foreignKey: "cmoneda"});
  maproductos.belongsTo(mamonedas, { as: "moneda", foreignKey: "cmoneda"});
  mamonedas.hasMany(maproductos, { as: "productos", foreignKey: "cmoneda"});
  popolizas.belongsTo(mamonedas, { as: "moneda", foreignKey: "cmoneda"});
  mamonedas.hasMany(popolizas, { as: "polizas", foreignKey: "cmoneda"});
  maestados.belongsTo(mapaises, { as: "pais", foreignKey: "cpais"});
  mapaises.hasMany(maestados, { as: "estados", foreignKey: "cpais"});
  cbmovimientos.belongsTo(mapersonas, { as: "tomador", foreignKey: "ctomador"});
  mapersonas.hasMany(cbmovimientos, { as: "tomador_movimientos", foreignKey: "ctomador"});
  macedentes.belongsTo(mapersonas, { as: "persona", foreignKey: "cpersona"});
  mapersonas.hasOne(macedentes, { as: "cedente", foreignKey: "cpersona"});
  madatos_poliza.belongsTo(mapersonas, { as: "asegurado", foreignKey: "casegurado"});
  mapersonas.hasMany(madatos_poliza, { as: "asegurado_datos_polizas", foreignKey: "casegurado"});
  madatos_poliza.belongsTo(mapersonas, { as: "tomador", foreignKey: "ctomador"});
  mapersonas.hasMany(madatos_poliza, { as: "tomador_datos_polizas", foreignKey: "ctomador"});
  seusuarios.belongsTo(mapersonas, { as: "persona", foreignKey: "cpersona"});
  mapersonas.hasOne(seusuarios, { as: "usuario", foreignKey: "cpersona"});
  cbcomisiones.belongsTo(maproductores, { as: "productor", foreignKey: "cproductor"});
  maproductores.hasMany(cbcomisiones, { as: "comisiones", foreignKey: "cproductor"});
  insconfig.belongsTo(maproductores, { as: "productor", foreignKey: "cproductor"});
  maproductores.hasMany(insconfig, { as: "configs", foreignKey: "cproductor"});
  madatos_poliza.belongsTo(maproductores, { as: "productor", foreignKey: "cproductor"});
  maproductores.hasMany(madatos_poliza, { as: "datos_polizas", foreignKey: "cproductor"});
  maproductos.belongsTo(maproductores, { as: "productor", foreignKey: "cproductor"});
  maproductores.hasMany(maproductos, { as: "productos", foreignKey: "cproductor"});
  popolizas.belongsTo(maproductores, { as: "productor_convenio", foreignKey: "cproductor_convenio"});
  maproductores.hasMany(popolizas, { as: "polizas_convenio", foreignKey: "cproductor_convenio"});
  seusuarios.belongsTo(maproductores, { as: "productor", foreignKey: "cproductor"});
  maproductores.hasMany(seusuarios, { as: "usuarios", foreignKey: "cproductor"});
  popolizas.belongsTo(maproductos, { as: "producto", foreignKey: "cproducto"});
  maproductos.hasMany(popolizas, { as: "polizas", foreignKey: "cproducto"});
  madatos_poliza.belongsTo(maramos, { as: "ramo", foreignKey: "cramo"});
  maramos.hasMany(madatos_poliza, { as: "datos_polizas", foreignKey: "cramo"});
  maintermediarios.belongsTo(matipo_intermediario, { as: "tipo_intermediario", foreignKey: "ctipo"});
  matipo_intermediario.hasMany(maintermediarios, { as: "intermediarios", foreignKey: "ctipo"});
  maproductores.belongsTo(matipo_produc, { as: "tipo_productor", foreignKey: "ctipo_productor"});
  matipo_produc.hasMany(maproductores, { as: "productores", foreignKey: "ctipo_productor"});
  cbrecibos.belongsTo(popolizas, { as: "poliza", foreignKey: "id_poliza"});
  popolizas.hasMany(cbrecibos, { as: "recibos", foreignKey: "id_poliza"});
  sesubmenu.belongsTo(semenu, { as: "menu", foreignKey: "cmenu"});
  semenu.hasMany(sesubmenu, { as: "submenus", foreignKey: "cmenu"});
  seusuarios.belongsTo(serol, { as: "rol", foreignKey: "crol"});
  serol.hasMany(seusuarios, { as: "usuarios", foreignKey: "crol"});
  maproductores.belongsTo(seusuarios, { as: "usuario", foreignKey: "cusuario"});
  seusuarios.hasOne(maproductores, { as: "productor_usuario", foreignKey: "cusuario"});

  macedentes.belongsToMany(maproductores, { through: macedentes_maproductores, as: "productores", foreignKey: "ccedente", otherKey: "cproductor"});
  maproductores.belongsToMany(macedentes, { through: macedentes_maproductores, as: "cedentes", foreignKey: "cproductor", otherKey: "ccedente"});

  serol.belongsToMany(sesubmenu, { through: serol_sesubmenu, as: "menus", foreignKey: "crol", otherKey: "csubmenu"});
  sesubmenu.belongsToMany(serol, { through: serol_sesubmenu, as: "roles", foreignKey: "csubmenu", otherKey: "crol"});

  seusuarios.belongsToMany(sesubmenu, { through: semenuconfig, as: "submenus", foreignKey: "cusuario", otherKey: "csubmenu"});
  sesubmenu.belongsToMany(seusuarios, { through: semenuconfig, as: "usuarios", foreignKey: "csubmenu", otherKey: "cusuario"});

  return {
    adfdcaja,
    adpresupuesto,
    auoperaciones,
    cbcierre,
    cbcomisiones,
    cbmovientos_cbcomisiones,
    cbmovimientos,
    cbrecibos,
    insconfig,
    maaranceles,
    maasegurados,
    mabancos,
    macedentes,
    macedentes_maproductores,
    maciudades,
    macoberturas,
    macolores,
    macontadores,
    madatos_bancarios,
    madatos_poliza,
    maestados,
    mainma,
    maintermediarios,
    mametodologiapago,
    mamonedas,
    mapaises,
    mapersonas,
    maprocesos,
    maproductores,
    maproductos,
    maramos,
    matipo_intermediario,
    matipo_produc,
    matomadores,
    podocumentos,
    popolizas,
    popolizas_autos,
    seconfig,
    semenu,
    semenuconfig,
    serol,
    serol_sesubmenu,
    sesubmenu,
    seusuarios,
    tmResumen_Pago,
    tmcmesan,
    tmconsulta_prima,
    tmrecibos,
    tmsuscripcion_polizas,
  };
}

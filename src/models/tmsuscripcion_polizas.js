import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tmsuscripcion_polizas extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('tmsuscripcion_polizas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ccobertura: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ccedente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    icedula_asegurado: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    xcedula_asegurado: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    xnombre_asegurado: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    xcorreo_asegurado: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    xtelefono_asegurado: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    icedula_tomador: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    xcedula_tomador: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    xnombre_tomador: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    xdireccion_tomador: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    xtelefono_tomador: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    xprofesion_tomador: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cestado_tomador: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cciudad_tomador: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xrif_tomador: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    xdomicilio_tomador: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    xzona_postal_tomador: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    xcorreo_tomador: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cmoneda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cramo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xpoliza: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    fdesde_pol: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fhasta_pol: {
      type: DataTypes.DATE,
      allowNull: true
    },
    femision: {
      type: DataTypes.DATE,
      allowNull: true
    },
    xcertificado: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cmetodologiapago: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xcobertura: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ptasa_cambio: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    msuma: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    msumaext: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    mprima: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    mprimaext: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    pcomision: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    mcomision: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    mcomisionext: {
      type: DataTypes.DECIMAL(17,2),
      allowNull: true
    },
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pcomision_p: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: true
    },
    cejecutivo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pcomision_e: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: true
    },
    cagente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pcomision_a: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: true
    },
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    igrua: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'tmsuscripcion_polizas',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "tmsuscripcion_polizas_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

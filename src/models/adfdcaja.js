import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class adfdcaja extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('adfdcaja', {
    cflujocaj: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true
    },
    ccodigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cmesan: {
      type: DataTypes.DECIMAL(6,0),
      allowNull: true
    },
    crecibo: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    itipomov: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    id_poliza: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ccedente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    casegurado: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cramo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cmoneda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ioperacion: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    fmovimiento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ptasa_cambio: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    xdetalle: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    mdebe: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mdebeext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mhaber: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mhaberext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    cbanco: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xreferencia: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    fcobro: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fpago: {
      type: DataTypes.DATE,
      allowNull: true
    },
    xobservacion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    fcierre: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fanulacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ccausa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cusuarioanul: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    iestado: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fmodificacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuariomod: {
      type: DataTypes.CHAR(10),
      allowNull: true
    }
  }, {
    tableName: 'adfdcaja',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_adfdcaja_1",
        unique: true,
        fields: [
          { name: "cflujocaj" },
          { name: "ccodigo" },
        ]
      },
    ]
  });
  }
}

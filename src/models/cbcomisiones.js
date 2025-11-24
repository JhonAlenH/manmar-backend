import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cbcomisiones extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('cbcomisiones', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    crecibo: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false
    },
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cmoneda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ptasamon: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    pcomision: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mcomision: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mcomisionext: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    cmovimiento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fliquidacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    iestado: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'cbcomisiones',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_cbcomisiones",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

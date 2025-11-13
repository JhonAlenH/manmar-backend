import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cbcomisiones extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('cbcomisiones', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    crecibo: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      references: {
        model: 'cbrecibos',
        key: 'crecibo'
      }
    },
    nrecibo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cprod_rel: {
      type: DataTypes.STRING(70),
      allowNull: false,
      references: {
        model: 'maintermediarios',
        key: 'cprod_rel'
      }
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

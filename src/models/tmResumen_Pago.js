import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tmResumen_Pago extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('tmResumen_Pago', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ccodigo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xnombre: {
      type: DataTypes.STRING(100),
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
    fpago: {
      type: DataTypes.DATE,
      allowNull: true
    },
    itipo: {
      type: DataTypes.CHAR(1),
      allowNull: true
    }
  }, {
    tableName: 'tmResumen_Pago',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_tmResumen_Pago",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tmconsulta_prima extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('tmconsulta_prima', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ptasa_cambio: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    mprima: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    fdesde: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fhasta: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tmconsulta_prima',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_tmconsulta_prima",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

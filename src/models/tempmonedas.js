import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tempmonedas extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('tempmonedas', {
    cmoneda: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    fmoneda: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ptasamon: {
      type: DataTypes.DECIMAL(20,6),
      allowNull: true
    }
  }, {
    tableName: 'tempmonedas',
    schema: 'dbo',
    timestamps: false
  });
  }
}

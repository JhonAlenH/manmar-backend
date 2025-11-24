import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class macedentes_maproductores extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('macedentes_maproductores', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ccedente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'macedentes_maproductores',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_macedentes_maproductores",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

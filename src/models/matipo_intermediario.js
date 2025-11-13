import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class matipo_intermediario extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('matipo_intermediario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xtipo: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'matipo_intermediario',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_matipo_intermediario",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

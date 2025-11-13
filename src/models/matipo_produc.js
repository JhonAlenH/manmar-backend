import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class matipo_produc extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('matipo_produc', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xtipo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'matipo_produc',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_matipo_produc",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

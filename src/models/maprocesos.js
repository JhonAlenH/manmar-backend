import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maprocesos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maprocesos', {
    cproceso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'auoperaciones',
        key: 'coperacion'
      }
    },
    xproceso: {
      type: DataTypes.STRING(50),
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
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'maprocesos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_maprocesos",
        unique: true,
        fields: [
          { name: "cproceso" },
        ]
      },
    ]
  });
  }
}

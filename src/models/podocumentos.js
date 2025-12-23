import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class podocumentos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('podocumentos', {
    cdocumento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    itipo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ccodigo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    xtitulo: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    xarchivo: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    xruta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'podocumentos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_podocumentos_1",
        unique: true,
        fields: [
          { name: "cdocumento" },
        ]
      },
    ]
  });
  }
}

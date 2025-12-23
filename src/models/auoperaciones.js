import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class auoperaciones extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('auoperaciones', {
    coperacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cproceso: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    iestado: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    xitem: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    xcambio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    xdetalles: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    cusuario_creacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'auoperaciones',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_auoperaciones",
        unique: true,
        fields: [
          { name: "coperacion" },
        ]
      },
    ]
  });
  }
}

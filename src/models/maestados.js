import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maestados extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maestados', {
    cpais: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mapaises',
        key: 'cpais'
      }
    },
    cestado: {
      autoIncrement: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    xestado: {
      type: DataTypes.STRING(250),
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
    cusuario: {
      type: DataTypes.DECIMAL(11,0),
      allowNull: true
    }
  }, {
    tableName: 'maestados',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_maestados",
        unique: true,
        fields: [
          { name: "cestado" },
        ]
      },
    ]
  });
  }
}

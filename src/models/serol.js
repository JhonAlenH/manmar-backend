import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class serol extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('serol', {
    crol: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    xrol: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    istatus: {
      type: DataTypes.CHAR(1),
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
      type: DataTypes.DECIMAL(11,0),
      allowNull: true
    }
  }, {
    tableName: 'serol',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_serol",
        unique: true,
        fields: [
          { name: "crol" },
        ]
      },
    ]
  });
  }
}

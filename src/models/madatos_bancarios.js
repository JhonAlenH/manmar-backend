import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class madatos_bancarios extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('madatos_bancarios', {
    cdatos_bancarios: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cbanco: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mabancos',
        key: 'cbanco'
      }
    },
    xtelefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cci_rif: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    xcuenta: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    itipo_cuenta: {
      type: DataTypes.CHAR(1),
      allowNull: true
    }
  }, {
    tableName: 'madatos_bancarios',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_madatos_bancarios",
        unique: true,
        fields: [
          { name: "cdatos_bancarios" },
        ]
      },
    ]
  });
  }
}

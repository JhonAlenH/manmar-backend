import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mainma extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('mainma', {
    ccodigo: {
      autoIncrement: true,
      type: DataTypes.DECIMAL(11,0),
      allowNull: false,
      primaryKey: true
    },
    cmarca: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    xmarca: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cmodelo: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    xmodelo: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cversion: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    xversion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    xtrans: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    xmotor: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    qano: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'mainma',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "mainma_pk",
        unique: true,
        fields: [
          { name: "ccodigo" },
        ]
      },
    ]
  });
  }
}

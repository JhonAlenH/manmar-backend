import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cbcierre extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('cbcierre', {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    cmesan: {
      type: DataTypes.DECIMAL(6,0),
      allowNull: true
    },
    fano: {
      type: DataTypes.DECIMAL(4,0),
      allowNull: true
    },
    fmes: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: true
    },
    fcierre: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fcierre_ant: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'cbcierre',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_cbcierre",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tmcmesan extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('tmcmesan', {
    cmesan: {
      type: DataTypes.DECIMAL(7,0),
      allowNull: false,
      primaryKey: true
    },
    nmes: {
      type: DataTypes.DECIMAL(3,0),
      allowNull: true
    },
    nano: {
      type: DataTypes.DECIMAL(5,0),
      allowNull: true
    },
    fdesde: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fhasta: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tmcmesan',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "tmcmesan_pk",
        unique: true,
        fields: [
          { name: "cmesan" },
        ]
      },
    ]
  });
  }
}

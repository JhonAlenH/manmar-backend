import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tmrecibos extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('tmrecibos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fdesde_rec: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fhasta_rec: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    mprima: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    cmetodologiapago: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tmrecibos',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_tmrecibos",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

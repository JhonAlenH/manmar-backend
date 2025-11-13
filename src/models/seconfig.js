import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class seconfig extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('seconfig', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pimpuesto: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    }
  }, {
    tableName: 'seconfig',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_macomisiones",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cbmovientos_cbcomisiones extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('cbmovientos_cbcomisiones', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cmovimiento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ccomision: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'cbmovientos_cbcomisiones',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_cbmovientos_cbcomisiones",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

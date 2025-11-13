import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class macontadores extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('macontadores', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cflujocaj: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    id_poliza: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    crecibo: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    ctomador: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    casegurado: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    }
  }, {
    tableName: 'macontadores',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_macontadores",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}

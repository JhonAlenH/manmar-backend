import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class maaranceles extends Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('maaranceles', {
    carancel: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ccedente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cproductor: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cramo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pcomision: {
      type: DataTypes.DECIMAL(18,2),
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
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'maaranceles',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_maaranceles_1",
        unique: true,
        fields: [
          { name: "carancel" },
        ]
      },
    ]
  });
  }
}

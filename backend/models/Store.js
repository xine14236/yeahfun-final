import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Store',
    {
      stores_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      owners_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precautions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      introduction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'store', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}

import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Room_campsite',
    {
      rooms_campsites_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stores_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      normal_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tent: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      people: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      square_meters: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      introduction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'room_campsite', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}

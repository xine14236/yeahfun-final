import { DataTypes } from 'sequelize';

export default function (sequelize) {
  return sequelize.define('Purchase_Item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    purchase_order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalday: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'purchase_item',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
}

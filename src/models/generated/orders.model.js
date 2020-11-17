module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define(
    "pxs_orders",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      order_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      remark: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      order_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      discount_percentage: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "pxs_orders",
    }
  );
  return Orders;
};

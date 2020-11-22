module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "pxs_products",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      unit_in_stock: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      discount_percentage: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      tax_percentage: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(250),
        allowNull: false,
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
      tableName: "pxs_products",
    }
  );
};

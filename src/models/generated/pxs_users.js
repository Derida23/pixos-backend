module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "pxs_users",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      address_district: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address_city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address_province: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER(2),
        allowNull: true,
        defaultValue: 1,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      remember_token: {
        type: DataTypes.STRING(250),
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
      tableName: "pxs_users",
    }
  );
};

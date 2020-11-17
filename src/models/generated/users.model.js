module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
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
      adress_district: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      adress_city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      adress_province: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      active: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      remember_token: {
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
      tableName: "pxs_users",
    }
  );
  return Users;
};

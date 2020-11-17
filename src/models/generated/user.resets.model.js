module.exports = (sequelize, Sequelize) => {
  const UserResets = sequelize.define(
    "pxs_user_resets",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(50),
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
      tableName: "pxs_user_resets",
    }
  );
  return UserResets;
};

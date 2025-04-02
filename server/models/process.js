const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const process = sequelize.define('process', {
    process_code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    process_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hour_average: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    tableName: 'process',
    timestamps: false,
  });

  // 관계 설정
  process.associate = (models) => {
    process.hasMany(models.userProcess, {
      foreignKey: "user_process_code",
      sourceKey: "process_code",
    });
    process.hasMany(models.taskStart, {
      foreignKey: 'process_code',
      sourceKey: 'process_code',
    });
  };

  return process;
};

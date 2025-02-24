const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbEnabledTasks = sequelize.define('TB_ENABLED_TASKS', {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '식별 id',
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '유저 아이디 (기본키) 가져오기',
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '작업 아이디 (기본키) 가져오기',
    },
  }, {
    tableName: 'TB_ENABLED_TASKS',
    timestamps: false,
  });

  // 관계 설정
  TbEnabledTasks.associate = (models) => {
    TbEnabledTasks.belongsTo(models.TB_USERS, {
      foreignKey: 'user_id',
      targetKey: 'user_id',
    });

    TbEnabledTasks.belongsTo(models.TB_PROCESSES, {
      foreignKey: 'process_id',
      targetKey: 'process_id',
    });
  };

  return TbEnabledTasks;
};

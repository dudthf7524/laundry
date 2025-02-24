const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbWorks = sequelize.define('TB_WORKS', {
    work_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '식별 id',
    },
    schedule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '해당 스케줄 id',
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '업무 공정 종류',
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '업무 실질적 시작 시간',
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '업무 실질적 종료 시간',
    },
    required_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '해야 하는 옷 벌 수',
    },
    completed_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '한 옷 벌 수',
    },
    work_performance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '업무 성과',
    },
  }, {
    tableName: 'TB_WORKS',
    timestamps: false,
  });

  // 관계 설정
  TbWorks.associate = (models) => {
    TbWorks.belongsTo(models.TB_SCHEDULES, {
      foreignKey: 'schedule_id',
      targetKey: 'schedule_id',
    });

    TbWorks.belongsTo(models.TB_PROCESSES, {
      foreignKey: 'process_id',
      targetKey: 'process_id',
    });
  };

  return TbWorks;
};

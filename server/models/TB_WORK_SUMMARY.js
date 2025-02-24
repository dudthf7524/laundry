const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbWorkSummary = sequelize.define('TB_WORK_SUMMARY', {
    summary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '식별 id',
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '직원 id',
    },
    summary_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: '날짜 (월별, 연도별 시작 날짜)',
    },
    performance_type: {
      type: DataTypes.ENUM('일별', '월별', '연도별'),
      allowNull: false,
      comment: '성과 유형',
    },
    performance_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: '업무 성과 비율',
    },
    performance_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '시간당 처리량',
    },
    performance_per_minute: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '분당 처리량',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '생성일',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '수정일',
    },
  }, {
    tableName: 'TB_WORK_SUMMARY',
    timestamps: false,
  });

  // 관계 설정
  TbWorkSummary.associate = (models) => {
    TbWorkSummary.belongsTo(models.TB_USERS, {
      foreignKey: 'employee_id',
      targetKey: 'user_id',
    });
  };

  return TbWorkSummary;
};

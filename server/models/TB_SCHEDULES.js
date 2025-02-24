const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbSchedules = sequelize.define('TB_SCHEDULES', {
    schedule_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '식별 id',
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '스케줄을 수행할 user id',
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: '스케줄이 적용되는 날짜',
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: '출근 시간',
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: '퇴근 시간',
    },
    break_start_time: {
      type: DataTypes.TIME,
      comment: '휴게 시간 시작',
    },
    break_end_time: {
      type: DataTypes.TIME,
      comment: '휴게 시간 종료',
    },
    total_work_hours: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: '근무 시간(계산식으로)',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '스케줄 상태',
    },
    overtime_flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '연장근무 여부',
    },
    overtime_hours: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: '연장근무 시간',
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
    work_season: {
      type: DataTypes.ENUM('평시', '준비수기', '비수기'),
      allowNull: true,
      comment: '근무시즌(평시, 준비수기, 비수기)',
    },
    work_status: {
      type: DataTypes.ENUM('근무중', '퇴근', '휴가'),
      allowNull: true,
      comment: '근무상태(근무중, 퇴근 등)',
    },
  }, {
    tableName: 'TB_SCHEDULES',
    timestamps: false,
  });

  // 관계 설정
  TbSchedules.associate = (models) => {
    if (models.TB_USERS) {
      TbSchedules.belongsTo(models.TB_USERS, {
        foreignKey: 'employee_id',
        targetKey: 'user_id',
      });
    } else {
      console.error('TB_USERS 모델이 존재하지 않습니다.');
    }
  };

  return TbSchedules;
};

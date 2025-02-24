const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbVacations = sequelize.define('TB_VACATIONS', {
    vacation_id: {
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
      comment: '휴가 시작 시간',
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
      comment: '휴가 종료 시간',
    },
    vacation_type: {
      type: DataTypes.ENUM('연차', '병가', '기타'),
      allowNull: false,
      comment: '휴가 타입 (연차, 병가, 기타)',
    },
    status: {
      type: DataTypes.ENUM('승인', '대기', '거절', '기본 대기'),
      allowNull: false,
      comment: '스케줄 상태 (승인, 대기, 거절, 기본 대기)',
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
    tableName: 'TB_VACATIONS',
    timestamps: false,
  });

  // 관계 설정
  TbVacations.associate = (models) => {
    if (models.TB_USERS) {
      TbVacations.belongsTo(models.TB_USERS, {
        foreignKey: 'employee_id',
        targetKey: 'user_id',
      });
    } else {
      console.error('TB_USERS 모델이 존재하지 않습니다.');
    }
  };

  return TbVacations;
};

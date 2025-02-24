const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbNotice = sequelize.define('TB_NOTICE', {
    notice_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '식별 id',
    },
    admin_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '공지한 관리자 id',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '공지사항의 본문',
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: '공지 시작일',
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: '공지 종료일',
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
    tableName: 'TB_NOTICE',
    timestamps: false,
  });

  // 관계 설정
  TbNotice.associate = (models) => {
    if (models.TB_USERS) {
      TbNotice.belongsTo(models.TB_USERS, {
        foreignKey: 'admin_id',
        targetKey: 'user_id',
      });
    } else {
      console.error('TB_USERS 모델이 존재하지 않습니다.');
    }
  };

  return TbNotice;
};

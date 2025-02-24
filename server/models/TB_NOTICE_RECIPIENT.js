const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbNoticeRecipient = sequelize.define('TB_NOTICE_RECIPIENT', {
    recipient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '식별 id',
    },
    notice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '공지 id',
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '수신자 직원 id',
    },
  }, {
    tableName: 'TB_NOTICE_RECIPIENT',
    timestamps: false,
  });

  // 관계 설정
  TbNoticeRecipient.associate = (models) => {
    if (models.TB_NOTICE) {
      TbNoticeRecipient.belongsTo(models.TB_NOTICE, {
        foreignKey: 'notice_id',
        targetKey: 'notice_id',
      });
    } else {
      console.error('TB_NOTICE 모델이 존재하지 않습니다.');
    }

    if (models.TB_USERS) {
      TbNoticeRecipient.belongsTo(models.TB_USERS, {
        foreignKey: 'employee_id',
        targetKey: 'user_id',
      });
    } else {
      console.error('TB_USERS 모델이 존재하지 않습니다.');
    }
  };

  return TbNoticeRecipient;
};

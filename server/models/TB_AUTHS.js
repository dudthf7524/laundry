const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbAuths = sequelize.define('TB_AUTHS', {
    auth_code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      comment: '권한 코드',
    },
    auth_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '권한 이름',
    },
  }, {
    tableName: 'TB_AUTHS',
    timestamps: false,
  });

  // 관계 설정
  TbAuths.associate = (models) => {
    if (models.TB_USERS) {
      TbAuths.hasMany(models.TB_USERS, {
        foreignKey: 'auth_code',
        sourceKey: 'auth_code',
      });
    } else {
      console.error('TB_USERS 모델이 존재하지 않습니다.');
    }
  };

  return TbAuths;
};

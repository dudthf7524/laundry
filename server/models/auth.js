const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const auth = sequelize.define('auth', {
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
    tableName: 'auth',
    timestamps: false,
  });

  // 관계 설정
  auth.associate = (models) => {
    if (models.user) {
      auth.hasMany(models.user, {
        foreignKey: 'auth_code',
        sourceKey: 'auth_code',
      });
    } else {
      console.error('TB_USERS 모델이 존재하지 않습니다.');
    }
  };

  return auth;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbUsers = sequelize.define('TB_USERS', {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      comment: '유저 아이디',
    },
    auth_code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
      comment: '권한 코드',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '유저 이름',
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '유저 닉네임',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '비밀번호',
    },
  }, {
    tableName: 'TB_USERS',
    timestamps: false,
  });

  // 관계 설정
  TbUsers.associate = (models) => {
    if (models.TB_AUTHS) {
      TbUsers.belongsTo(models.TB_AUTHS, {
        foreignKey: 'auth_code',
        targetKey: 'auth_code',
      });
    } else {
      console.error('TB_AUTHS 모델이 존재하지 않습니다.');
    }
  };

  return TbUsers;
};

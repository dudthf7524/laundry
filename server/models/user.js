const { DataTypes } = require('sequelize');
const auth = require('./auth');

module.exports = (sequelize) => {
  const user = sequelize.define('user', {
    user_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auth_code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "A4",
    },
    user_hire_date: {
      type: DataTypes.STRING, // 날짜를 'YYYY-MM-DD' 형식의 문자열로 저장
      allowNull: false,
      defaultValue: "2000-01-01",
    },
    user_position: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '사원', // 기본값을 '사원'으로 설정
    },
  }, {
    underscored: true,
    tableName: 'user',
  });

  // 관계 설정
  user.associate = (models) => {

    user.belongsTo(models.auth, {
      foreignKey: 'auth_code',
      targetKey: 'auth_code',
    });
    user.hasOne(models.time, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.userProcess, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.task, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.work, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.attendanceStart, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.attendanceEnd, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
    user.hasMany(models.vacation, {
      foreignKey: 'user_code',
      sourceKey: 'user_code',
    });
  };

  return user;
};

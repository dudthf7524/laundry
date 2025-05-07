const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const notice = sequelize.define('notice', {
    notice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    notice_title: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    notice_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'notice',
    timestamps: false,
  });
  // 관계 설정
  notice.associate = (models) => {
  };

  return notice;
};

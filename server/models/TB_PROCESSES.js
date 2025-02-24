const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TbProcesses = sequelize.define('TB_PROCESSES', {
    process_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '식별 id',
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '공정 이름 (다림질, 1차 포장 등)',
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '위치 또는 추가 정보',
    },
  }, {
    tableName: 'TB_PROCESSES',
    timestamps: false,
  });

  return TbProcesses;
};

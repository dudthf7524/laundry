const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const workType = sequelize.define('workType', {
        work_type_code: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        work_type_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'work_type',
        timestamps: false,
    });

    // 관계 설정
    workType.associate = (models) => {

    };

    return workType;
};

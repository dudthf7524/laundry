const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const fixedTime = sequelize.define('fixed_time', {
        fixed_time_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fixed_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fixed_end_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rest_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rest_end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "A4",
        },
    }, {
        timestamps: false,
        tableName: 'fixed_time',
    });

    // 관계 설정
    fixedTime.associate = (models) => {

        fixedTime.belongsTo(models.user, {
            foreignKey: 'auth_code',
            targetKey: 'auth_code',
        });

    };

    return fixedTime;
};

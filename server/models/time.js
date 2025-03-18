const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const time = sequelize.define('time', {
        time_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_time: {
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
        tableName: 'time',
    });

    // 관계 설정
    time.associate = (models) => {

        time.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });

    };

    return time;
};

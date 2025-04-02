const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attendanceStart = sequelize.define('attendance_start', {

        attendance_start_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        attendance_start_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_start_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        rest_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        rest_end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'attendance_start',
    });

    // 관계 설정
    attendanceStart.associate = (models) => {

        attendanceStart.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
        attendanceStart.hasOne(models.attendanceEnd, {
            foreignKey: 'attendance_start_id',
            sourceKey: 'attendance_start_id',
        });
    };

    return attendanceStart;
};

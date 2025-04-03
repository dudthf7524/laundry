const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attendanceEnd = sequelize.define('attendance_end', {

        attendance_end_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        attendance_end_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        attendance_end_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attendance_start_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'attendance_end',
    });

    // 관계 설정
    attendanceEnd.associate = (models) => {

        attendanceEnd.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
        attendanceEnd.belongsTo(models.attendanceStart, {
            foreignKey: 'attendance_start_id',
            targetKey: 'attendance_start_id',
        });

    };

    return attendanceEnd;
};

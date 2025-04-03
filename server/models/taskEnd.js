const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const taskEnd = sequelize.define('task_end', {
        task_end_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        task_end_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        total_count: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_end_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        hour_average: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        tableName: 'task_end',
        timestamps: false,
    });

    // 관계 설정
    taskEnd.associate = (models) => {
        taskEnd.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
        taskEnd.belongsTo(models.taskStart, {
            foreignKey: 'task_start_id',
            targetKey: 'task_start_id',
        });

    };

    return taskEnd;
};

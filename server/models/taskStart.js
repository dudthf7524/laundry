const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const taskStart = sequelize.define('task_start', {
        task_start_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        task_start_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_count: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_start_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        process_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        tableName: 'task_start',
        timestamps: false,
    });

    // 관계 설정
    taskStart.associate = (models) => {
        taskStart.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
        taskStart.belongsTo(models.process, {
            foreignKey: 'process_code',
            targetKey: 'process_code',
        });
        taskStart.hasOne(models.taskEnd, {
            foreignKey: 'task_start_id',
            sourceKey: 'task_start_id',
        });

    };

    return taskStart;
};

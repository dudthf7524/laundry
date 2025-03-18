const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const task = sequelize.define('task', {
        task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        process_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        task_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_end_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_count: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        task_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },

    }, {
        tableName: 'task',
        timestamps: false,
    });

    // 관계 설정
    task.associate = (models) => {
        task.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
        task.belongsTo(models.process, {
            foreignKey: 'process_code',
            targetKey: 'process_code',
        });

    };

    return task;
};

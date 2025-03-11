const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const userProcess = sequelize.define('user_process', {
        user_process_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_process_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_process_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        timestamps: false,
        tableName: 'user_process',
    });

    // 관계 설정
    userProcess.associate = (models) => {
        userProcess.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
        userProcess.belongsTo(models.process, {
            foreignKey: "user_process_code",
            targetKey: "process_code",
        });


    };

    return userProcess;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const vacation = sequelize.define('vacation', {
        vacation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        vacation_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        vacation_content: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        vacation_state: {
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
        tableName: 'vacation',
    });

    // 관계 설정
    vacation.associate = (models) => {

        vacation.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });
    };

    return vacation;
};

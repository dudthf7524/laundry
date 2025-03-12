const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const work = sequelize.define('work', {

        work_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        work_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        work_start_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        work_end_time: {
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
        tableName: 'work',
    });

    // 관계 설정
    work.associate = (models) => {

        work.belongsTo(models.user, {
            foreignKey: 'user_code',
            targetKey: 'user_code',
        });

    };

    return work;
};

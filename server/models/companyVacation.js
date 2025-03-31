const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const companyVacation = sequelize.define('company_vacation', {
        company_vacation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_vacation_date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        company_vacation_reason: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
    }, {
        timestamps: false,
        tableName: 'company_vacation',
    });

    // 관계 설정
    companyVacation.associate = (models) => {
    };

    return companyVacation;
};

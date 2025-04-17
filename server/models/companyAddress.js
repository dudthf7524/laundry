const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const companyAddress = sequelize.define('company_address', {
        company_address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location_latitude: {
            type: DataTypes.FLOAT, 
            allowNull: false,
        },
        location_hardness: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'company_address',
        timestamps: false,
    });

    // 관계 설정
    companyAddress.associate = (models) => {
    };

    return companyAddress;
};

'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BusinessAddress extends Model{
        static associate(models){};
    }
    BusinessAddress.init({
        owner_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        business_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        address1: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address2: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
        phone1: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phone2: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },{
        timestamps: false,
        sequelize,
        modelName: 'business_address',
    });
    return BusinessAddress;
}

// Nexever Pvt Ltd, Industrial Area, Sector 75, Sahibzada Ajit Singh Nagar, Punjab

// Prime Tower, F-542, Third Floor, IT PARK Phase, 8-A, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160062

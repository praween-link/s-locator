'use strict';

const {Model, STRING} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business extends Model {
        static associate(models){};
    }
    Business.init({
        ownner_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        business_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        about_me: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        logo: {
            type: STRING(250),
            allowNull: true,
            get() {
                if(this.getDataValue('business_logo')){
                    return "/upload/images/logo/"+this.getDataValue('business_logo');
                }
            }
        },
        address_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        sub_category: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.FLOAT(10, 6),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT(10, 6),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('0', '1'),
            defaultValue: '1',
            allowNull: false
        }
    },{
        sequelize,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        modelName: 'business',
    });

    return Business;
}
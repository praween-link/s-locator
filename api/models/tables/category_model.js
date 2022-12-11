'use strict';

const {Model, DATE} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BusinessCategory extends Model {
        static associate(models){}
    }
    BusinessCategory.init({
        category: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },{
        timestamps: false,
        sequelize,
        modelName: 'business_category',
    });
    return BusinessCategory
}
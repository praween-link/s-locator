'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    class BusinessSubCategory extends Model{
        static associate(models){}
    }
    BusinessSubCategory.init({
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        sub_category: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },{
        timestamps: false,
        sequelize,
        modelName: 'business_sub_category',
    });
    return BusinessSubCategory;
}
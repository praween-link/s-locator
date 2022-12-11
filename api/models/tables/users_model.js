'use strict';
const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('..');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models){}
    }
    User.init({
        first_name: {
            type: DataTypes.STRING(21),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(21),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            required: true,
            unique: true,
        },
        email_verifyed: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
        },
        password: {
            type: DataTypes.STRING(21),
            allowNull: false,
            required: true,
        },
        profile_image: {
            type: DataTypes.STRING(250),
            allowNull: true,
            get() {
                if(this.getDataValue('profile_img')){
                    return "/upload/images/profile/"+this.getDataValue('profile_img');
                }
            }
        },
        status: {
            type: DataTypes.ENUM('0', '1'),
            defaultValue: '1',
            allowNull: false
        }
    },{
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        sequelize,
        modelName: 'user',
    });
    
    return User;
}
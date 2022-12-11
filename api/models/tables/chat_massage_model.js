'use strict';

const {Model, STRING} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChatMassage extends Model {
        static associate(models){};
    }
    ChatMassage.init({
        sender_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        reciever_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        massage: {
            type: DataTypes.STRING(250),
            allowNull: true,
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
        modelName: 'chat_massage',
    });

    return ChatMassage;
}
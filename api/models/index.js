const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../config');
const { Join } = require('../utils/joining');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force: false}).then(()=> {
    console.log("Yes, re-sync!");
});
///
db.Users = require('./tables/users_model')(sequelize, DataTypes);
db.Business = require('./tables/business_model')(sequelize, DataTypes);
db.BusinessAddress = require('./tables/business_address_model')(sequelize, DataTypes);
db.BusinessCategory = require('./tables/category_model')(sequelize, DataTypes);
db.BusinessSubCategory = require('./tables/sub_category_model')(sequelize, DataTypes);
//
db.ChatMassage = require('./tables/chat_massage_model')(sequelize, DataTypes);

/// Tabale Joining
Join.oneToOne(db.Business, db.BusinessAddress, 'business_id');
Join.oneToMany(db.BusinessCategory, db.BusinessSubCategory, 'category_id');
///
module.exports = db;
const {Router} = require('express');
const routers = Router();
const {checkToken} = require('../utils/token_validation');
//

const User = require('../controllers/users_controller');
const Business = require('../controllers/business_controller');
const BusinessAddress = require('../controllers/business_address_controller');
const Category = require('../controllers/category_controller');
const SubCategory = require('../controllers/sub_category_controller');
const Chatting = require('../controllers/chat_massage_controller');

/// User
routers.get('/', (req, resp)=> resp.send("Welcome to s-locator!"));
routers.post('/sign-up', User.userSignUp);
routers.post('/sign-in', User.userSignIn);

/// Business
routers.post('/add-business', checkToken, Business.createBusiness);
routers.post('/get-all-business', checkToken, Business.getAllBusiness);
routers.post('/add-business-address', checkToken, BusinessAddress.add);
routers.post('/get-business-address', checkToken, BusinessAddress.getBusinessAddress);
//
routers.post('/business/search', checkToken, Business.searchBusiness);
//
routers.post('/business/category/add', Category.add);
routers.get('/business/category/get-all', Category.getAll);
routers.post('/business/sub-category/add', SubCategory.add);
//
routers.post('/chat/send-massage', checkToken, Chatting.send);
routers.post('/chat/get-massage', checkToken, Chatting.get);
routers.get('/user/get-all', checkToken, User.getAll);

module.exports = routers;
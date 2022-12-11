const db = require('../models');
const {Validations} = require('../utils/validations');
const validations = new Validations();
const Users = db.Users;
const jwt = require('jsonwebtoken');

const User = {};

User.userSignUp = async (req, resp) => {
    try{
        const body = req.body;
        console.log("first_name: "+body.first_name);
        console.log("last_name: "+body.last_name);
        console.log("email: "+body.email);
        console.log("password: "+body.password);
        if(body.last_name !=undefined&&body.first_name !=undefined){
            const valid = validations.isValid({name: body.first_name+' '+body.last_name, email: body.email, password: body.password});
            if(valid.status){
                var userdata = await Users.findOne({where: {email: body.email}});
                if(userdata==null){
                    var response = await Users.create({
                        first_name: body.first_name,
                        last_name: body.last_name,
                        email: body.email,
                        password: body.password,
                    });
                    resp.status(201).json({
                        error: false,
                        message: 'User sign up successfully!',
                        data: response,
                    });
                }else{
                    resp.status(400).json({
                        error: true,
                        message: "Email: '"+body.email+ "' is alredy exist!",
                    });
                }
            }else{
                resp.status(400).json({
                    error: true,
                    message: valid.message,
                });
            }
        }else{
            resp.status(400).json({
                error: true,
                message: (body.first_name ==undefined?'first_name':'last_name')+" is missing!",
            });
        }
        
    }catch(error){
        console.log("Error: "+error);
        resp.status(400).json({
            error: true,
            message: 'Something went worng!',
        });
    }
};
///
User.userSignIn = async (req, resp) => {
    try{
        const body = req.body;
        console.log("email: "+body.email);
        console.log("password: "+body.password);
        var response = await Users.findOne({where: {email: body.email, password: body.password}});
        if(response!=null){
            var token = jwt.sign({
                id: response.id,
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                created_at: response.created_at,
                updated_at: response.updated_at
              }, process.env.TOKEN_KEY);
            resp.status(200).json({
                error: false,
                message: 'User login successfully!',
                data: response,
                token: token,
            });
        }else{
            resp.status(200).json({
                error: true,
                message: "Invalid email & password!",
            });
        }
        
    }catch(error){
        console.log("Error: "+error);
        resp.status(400).json({
            error: true,
            message: 'Something went worng!',
        });
    }
};
///
User.getAll = async (req, resp) => {

    try{
        const body = req.body;
        var response = await Users.findAll();
        if(response!=null){
            resp.status(200).json({
                error: false,
                message: 'Get all users successfully!',
                user: response,
            });
        }else{
            resp.status(200).json({
                error: true,
                message: "Get user failed!",
            });
        }
        
    }catch(error){
        console.log("Error: "+error);
        resp.status(400).json({
            error: true,
            message: 'Something went worng!',
        });
    }
};

module.exports = User;
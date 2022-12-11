const db = require('../models');
const {Validations} = require('../utils/validations');
const validations = new Validations();
const {tokenDecode} = require('../utils/token_validation');
const {Op} = require('sequelize');


const ChatMassageModel = db.ChatMassage;
const UsersModel = db.Users;

const ChatMassage = {};

ChatMassage.send = async (req, resp) => {
    try{
        const body = req.body;
        /// --- Token Decode ---
        let token = req.get("authorization");
        tokenDecode(token.split(' ')[1], function(respDecoded){
            if(respDecoded != undefined){
                // console.log("Decoded: "+respDecoded.email);
                body.sender_id = respDecoded.id;
            }
        });
        // ---------------------
        console.log("sender_id: "+body.sender_id);
        console.log("reciever_id: "+body.reciever_id);
        console.log("massage: "+body.massage);
        //
        var notUndefined = validations.isNotUndefined({sender_id: body.sender_id, reciever_id: body.reciever_id, massage: body.massage});
        console.log("oooo> "+notUndefined.status);
        if(notUndefined.status){
                var response = await ChatMassageModel.create({
                    sender_id: body.sender_id,
                    reciever_id: body.reciever_id,
                    massage: body.massage,
                });
                resp.status(200).json({
                    error: false,
                    message: 'Send massage successfully!',
                    data: response,
                });
        }else{
            resp.status(400).json({
                error: true,
                message: notUndefined.message,
            });
        }
        
    }catch(error){
        console.log("Error: "+error);
        resp.status(400).json({
            error: true,
            message: 'Something went worng!',
        });
    }
}

///
ChatMassage.get = async (req, resp) => {
    try{
        var body = req.body;
        // --- Token Decode ---
        let token = req.get("authorization");
        tokenDecode(token.split(' ')[1], function(respDecoded){
            if(respDecoded != undefined){
                // console.log("Decoded: "+respDecoded.email);
                body.sender_id = respDecoded.id;
            }
        });
        // ---------------------
        console.log("sender_id: "+body.sender_id);
        console.log("reciever_id: "+body.reciever_id);
        console.log("reciever_id: "+body.reciever_id);
        
        var notUndefined = validations.isNotUndefined({sender_id: body.sender_id, reciever_id: body.reciever_id});
        console.log("oooo> "+notUndefined.status);
        if(notUndefined.status){
            console.log(typeof body.created_at+" ===ppp-");
            var response;
            if(body.created_at == undefined){
                response =await ChatMassageModel.findAll({
                    where: {
                        [Op.or]: [
                            {
                                sender_id: body.sender_id,
                                reciever_id: body.reciever_id,
                            },
                            {
                                sender_id: body.reciever_id,
                                reciever_id: body.sender_id
                            }
                        ]
                    }
                });
            }else{
                response =await ChatMassageModel.findAll({
                    where: {
                        [Op.or]: [
                            {
                                sender_id: body.sender_id,
                                reciever_id: body.reciever_id,
                            },
                            {
                                sender_id: body.reciever_id,
                                reciever_id: body.sender_id
                            }
                        ],
                        created_at: {
                            [Op.gt]: body.created_at,
                        }
                    }
                });
            }
            resp.status(200).json({
                error: false,
                message: "Get all messages successfully!",
                chat_messages: response,
            });
        }else{
            resp.status(400).json({
                error: true,
                message: notUndefined.message,
            });
        }
        // console.log("Business Id: "+body.business_id);
        
    }catch(error){
        console.log("Get Chat Massages Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}

///
module.exports = ChatMassage;

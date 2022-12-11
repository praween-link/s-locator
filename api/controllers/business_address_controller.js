const { sequelize } = require('../models');
const db = require('../models');
const {tokenDecode} = require('../utils/token_validation');
const {Validations} = require('../utils/validations');
const validations = new Validations();

const BusinessAddressModel = db.BusinessAddress;

const BusinessAddress = {};

BusinessAddress.add = async (req, resp) => {
    try{
        var body = req.body;
        /// --- Token Decode ---
        let token = req.get("authorization");
        tokenDecode(token.split(' ')[1], function(respDecoded){
            if(respDecoded != undefined){
                // console.log("Decoded: "+respDecoded.email);
                body.owner_id = respDecoded.id;
            }
        });
        // ---------------------
        ///owner_id, business_id, address1, address2, city, country, state, zip_code, phone1, phone2, email, longitude, latitude
        console.log("owner_id: "+body.owner_id);
        console.log("business_id: "+body.business_id);
        console.log("address1: "+body.address1);
        console.log("address2: "+body.address2);
        console.log("city: "+body.city);
        console.log("country: "+body.country);
        console.log("state: "+body.state);
        console.log("zip_code: "+body.zip_code);
        console.log("phone1: "+body.phone1);
        console.log("email: "+body.email);
        ////
        var valid = validations.isValid({
            owner_id: body.owner_id,
            business_id: body.business_id,
            address1: body.address1,
            city: body.city,
            country: body.country,
            state: body.state,
            zip_code: body.zip_code,
            phone: body.phone1,
            email: body.email
        });
        if(valid.status){
            var responseAddress = await BusinessAddressModel.findOne({where: {owner_id: body.owner_id, business_id: body.business_id}});
            if(responseAddress == null){
                var response = await BusinessAddressModel.create({
                    owner_id: body.owner_id,
                    business_id: body.business_id,
                    address1: body.address1,
                    city: body.city,
                    country: body.country,
                    state: body.state,
                    zip_code: body.zip_code,
                    phone1: body.phone1,
                    email: body.email
                });
                resp.status(201).json({
                    error: false,
                    message: "Business address added successfully!",
                    address: response,
                });
            }else{
                resp.status(400).json({
                    error: true,
                    message: "Business address alredy added!",
                });
            }
            
        }else{
            resp.status(400).json({
                error: true,
                message: valid.message,
            });
        }
        
    }catch(error){
        console.log("Business Address Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}
///
BusinessAddress.getBusinessAddress = async (req, resp) => {
    try{
        var body = req.body;
        /// --- Token Decode ---
        let token = req.get("authorization");
        tokenDecode(token.split(' ')[1], function(respDecoded){
            if(respDecoded != undefined){
                // console.log("Decoded: "+respDecoded.email);
                body.owner_id = respDecoded.id;
            }
        });
        // ---------------------
        var valid = validations.isValid({business_id: body.business_id});
        if(valid.status){
            var response = await BusinessAddressModel.findOne({where: {owner_id: body.owner_id, business_id: body.business_id}});
            resp.status(200).json({
                error: false,
                message: "Get address successfully!",
                address: response,
            });
        }else{
            resp.status(400).json({
                error: true,
                message: valid.message,
            });
        }
        console.log("Business Id: "+body.business_id);
        
    }catch(error){
        console.log("Get Business Address Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}
///
module.exports = BusinessAddress;
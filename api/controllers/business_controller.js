const db = require('../models');
const {Validations} = require('../utils/validations');
const validations = new Validations();
const {tokenDecode} = require('../utils/token_validation');


const BusinessModel = db.Business;
const BusinessAddressModel = db.BusinessAddress;

const Business = {};

Business.createBusiness = async (req, resp) => {
    try{
        const body = req.body;
        /// --- Token Decode ---
        let token = req.get("authorization");
        tokenDecode(token.split(' ')[1], function(respDecoded){
            if(respDecoded != undefined){
                // console.log("Decoded: "+respDecoded.email);
                body.ownner_id = respDecoded.id;
            }
        });
        // ---------------------
        console.log("ownner_id: "+body.ownner_id);
        console.log("business_name: "+body.business_name);
        console.log("about_me: "+body.about_me);
        console.log("logo: "+body.logo);
        console.log("address_id: "+body.address_id);
        console.log("latitude: "+body.latitude);
        console.log("longitude: "+body.longitude);
        //
        var notUndefined = validations.isNotUndefined({ownner_id: body.ownner_id, address_id: body.address_id, longitude: body.longitude, category: body.category, sub_category: body.sub_category, latitude: body.latitude});
        console.log("oooo> "+notUndefined.status);
        if(notUndefined.status){
            var isValid = validations.isValid({business_name: body.business_name});
            if(isValid.status){
                var response = await BusinessModel.create({
                    ownner_id: body.ownner_id,
                    business_name: body.business_name,
                    about_me: body.about_me,
                    logo: body.logo,
                    address_id: body.address_id, category: body.category, sub_category: body.sub_category,
                    latitude: body.latitude,
                    longitude: body.longitude
                });
                resp.status(200).json({
                    error: false,
                    message: 'Created new business successfully!',
                    data: response,
                });
            }else{
                resp.status(400).json({
                    error: true,
                    message: isValid.message,
                });
            }
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
Business.getAllBusiness = async (req, resp) => {
    try{
    //     var body = req.body;
    //     // --- Token Decode ---
    //     let token = req.get("authorization");
    //     tokenDecode(token.split(' ')[1], function(respDecoded){
    //         if(respDecoded != undefined){
    //             // console.log("Decoded: "+respDecoded.email);
    //             body.owner_id = respDecoded.id;
    //         }
    //     });
        // ---------------------
        // var valid = validations.isValid({business_id: body.business_id});
        // if(valid.status){
            var response = await BusinessModel.findAll({ include: BusinessAddressModel });
            resp.status(200).json({
                error: false,
                message: "Get all successfully!",
                business: response,
            });
        // }else{
        //     resp.status(400).json({
        //         error: true,
        //         message: valid.message,
        //     });
        // }
        // console.log("Business Id: "+body.business_id);
        
    }catch(error){
        console.log("Get Business Address Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}
///
Business.searchBusiness = async (req, resp) => {
    try{
        const body = req.body;
        // const latitude = 25.677125;//28.626137;
        // const longitude = 87.545286;//79.821602;'
        // const latitude = 25.667941;
        // const longitude = 87.527358;
        // const latitude = 25.671950;
        // const longitude = 87.546260;
        
        // const distance = 3;//, 

        
        //----------------------------
    //     var body = req.body;
    //     // --- Token Decode ---
    //     let token = req.get("authorization");
    //     tokenDecode(token.split(' ')[1], function(respDecoded){
    //         if(respDecoded != undefined){
    //             // console.log("Decoded: "+respDecoded.email);
    //             body.owner_id = respDecoded.id;
    //         }
    //     });
        // ---------------------
        var valid = validations.isValid({latitude: body.latitude, longitude: body.longitude, radius: body.radius});
        if(valid.status){
            const haversine = `(
                6371 * acos(
                    cos(radians(${body.latitude}))
                    * cos(radians(latitude))
                    * cos(radians(longitude) - radians(${body.longitude}))
                    + sin(radians(${body.latitude})) * sin(radians(latitude))
                )
            )`;
            const targets = await BusinessModel.findAll({
                include: BusinessAddressModel,
                attributes: [
                    'id',
                    "status",
                    'ownner_id',
                    [db.sequelize.literal(haversine), 'distance_km'],
                    'business_name',
                    "about_me",
                    "address_id",
                    "category",
                    "sub_category",
                    "latitude",
                    "longitude",
                    "updated_at",
                    "created_at"
                ],
                // where: {
                //     status: 1
                // },
                order: db.sequelize.col('distance_km'),
                having: db.sequelize.literal(`distance_km <= ${body.radius}`),
                // limit: 5
            });
            resp.status(200).json({
                error: false,
                message: "Get all successfully!",
                business: targets,
            });
        }else{
            resp.status(400).json({
                error: true,
                message: valid.message,
            });
        }
        // console.log("Business Id: "+body.business_id);
        
    }catch(error){
        console.log("Get Business Address Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}
///
module.exports = Business;

///25.666627, 87.527249


////25.676533, 87.545079 --D (Routara)-
////25.667653, 87.528463 --D (Hanuman Mandir Routara)-
////25.676555, 87.545082 --D (My Home Pipra)-
////25.677512, 87.546035 --D (Pipra School)-
////25.670803, 87.554635 --D (Uchatpur Market)-

// 30.694436, 76.690462
//        |1km
// 30.697931, 76.689235

//---
// 0.003495, -0.001227 ||| -0.003495, 0.001227
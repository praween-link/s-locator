
const db = require('../models/');
const BusinessCategory = db.BusinessCategory;
const BusinessSubCategory = db.BusinessSubCategory;
const {Validations} = require('../utils/validations');
const validations = new Validations();

const Category = {};

Category.add = async (req, resp) => {
    try{
        const body = req.body;
        console.log("category: "+body.category);
        var valid = validations.isValid({category: body.category});
        if(valid.status){
            var temp = await BusinessCategory.findOne({where: {category: body.category}});
            console.log("Temp: "+temp);
            if(temp==null){
                const response = await BusinessCategory.create({category: body.category});
                resp.status(201).json({
                    error: false,
                    message: "Add business category successfully!",
                    category: response,
                }); 
            }else{
                resp.status(400).json({
                    error: true,
                    message: "This category alredy exist!",
                }); 
            }
        }else{
            resp.status(400).json({
                error: true,
                message: valid.message,
            });
        }
        
    }catch(error) {
        console.log("Category Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}
//
Category.getAll = async (req, resp) => {
    try{
        var response = await BusinessCategory.findAll({include:[{model:BusinessSubCategory}]});
        resp.status(201).json({
            error: false,
            message: "Get All categories successfully!",
            categories: response,
        });
    }catch(error){
        console.log("Get All Sub Category Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}

module.exports = Category;
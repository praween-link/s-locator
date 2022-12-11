const db = require('../models');
const BusinessSubCategory = db.BusinessSubCategory;
const {Validations} = require('../utils/validations');
const validations = new Validations();

const SubCategory = {};

SubCategory.add = async (req, resp) => {
    try{
        const body = req.body;
        // console.log("category: "+body.sub_category);
        var valid = validations.isValid({category_id: body.category_id, sub_category: body.sub_category});
        if(valid.status){
            var temp = await BusinessSubCategory.findOne({where: {category_id: body.category_id, sub_category: body.sub_category}});
            console.log("Temp: "+temp);
            if(temp==null){
                const response = await BusinessSubCategory.create({category_id: body.category_id, sub_category: body.sub_category});  
                resp.status(201).json({
                    error: false,
                    message: "Add business sub category successfully!",
                });
            }else{
                resp.status(400).json({
                    error: true,
                    message: "This sub category alredy exist!",
                }); 
            }
        }else{
            resp.status(400).json({
                error: true,
                message: valid.message,
            });
        }
    }catch(error){
        console.log("Sub Category Error: "+error);
        resp.status(400).json({
            error: true,
            message: "Something went worng!",
        });
    }
}

module.exports = SubCategory;
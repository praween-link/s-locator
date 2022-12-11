const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    checkToken: (request, response, next) => {
        let token = request.get("authorization");
        // console.log("Req Token: "+token);
        if(token){
            token = token.split(' ')[1];
            jwt.verify(token, process.env.TOKEN_KEY, (error, decoded)=>{
                // console.log("Decoded: "+decoded.email);
                if(error){
                    response.json({
                        error: true,
                        message: "Invalid token"
                    });
                    return undefined;
                }else{
                    next();
                    return decoded;
                }
            });
        }else{
            response.json({
                error: true,
                message: "Access denied! unautorized user!"
            });
            return undefined;
        }
        
    },
    tokenDecode(token, respDecoded) {
        if(token){
            jwt.verify(token, process.env.TOKEN_KEY, (error, decoded)=>{
                // console.log("Decoded: "+decoded.email);
                if(error){
                    return respDecoded(undefined);
                }else{
                    return respDecoded(decoded);
                }
            });
        }else{
            return respDecoded(undefined);
        }
    }
}

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
var nameRegex = /^[a-zA-Z ]{2,50}$/;
var numberRegex = /^[0-9]*$/;

class Validations {
    isValid(list) {
        for(var val in list){
            console.log("--> "+val+"||"+list[val]);
            if(list[val]==undefined||list[val].toString().trim()=='') return {status: false, message: val+ (list[val]==undefined?' is missing!':' is not valid!')};
            if(val=='name'){
                if(!this.isValidName(list[val])) return {status: false, message: val+' is not valid!'};
            }
            if(val=='email'){
                if(!this.isValidEmail(list[val])) return {status: false, message: val+ ' is not valid!'};
            }
            if(val=='password'){
                if(!this.isValidPassword(list[val])) return {status: false, message: val+ ' is not valid!'};
            }
            if(val=='phone'){
                if(!this.isValidPhoneNumber(list[val])) return {status: false, message: val+ ' is not valid!'};
            }
        }
        return {status: true};
    }
    isNotUndefined(list) {
        for(var val in list){
            if(list[val]==undefined) return {status: false, message: val+ ' is missing!'};
        }
        return {status: true};
    }
    isValidEmail(email) {
        if (!email) return false;
        if (email.length > 200) return false;
        if (!emailRegex.test(email)) return false;
        const parts = email.split("@");
        if (parts[0].length > 64) return false;
        if (email.split("@")[1].split(".").some(function (part) { return part.length > 63; })) return false;
        return true;
    }
    isValidName(name) {
        if (!nameRegex.test(name.trim())) return false;
        return true;
    }
    isValidPhoneNumber(number){
        if(number.length<9) return false;
        if(number.length>20) return false;
        if(!numberRegex.test(number)) return false;
        return true;
    }
    isValidPassword(number){
        if(number.length<6) return false;
        return true;
    }
}
module.exports = {Validations};
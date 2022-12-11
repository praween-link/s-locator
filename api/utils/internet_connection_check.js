let dns = require('dns')

function isInternetOnline(callback) { 
    dns.lookup('google.com', function (error) {
        if (error && error.code == "ENOTFOUND") {
            callback(false);
        } else {
            callback(true);
        }
    })
}
isInternetOnline(function (isOnline) {
    if (isOnline) {
        console.log("internet connection status is online");
        return true;
    } else {
        console.log("internet connection status is offline");
        return false;
    }
});
module.exports = {isInternetOnline};
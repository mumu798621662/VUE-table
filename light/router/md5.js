var crypto = require("crypto");
function md5(str){
    var hash = crypto.createHash("md5")
    hash.update(str) ;
    return (hash.digest("hex"))
}
module.exports =md5;
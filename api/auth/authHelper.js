const providers = require('email-providers/common.json');

module.exports.checkPassword = (password, res, isRegister) => {
    if(password.length < 6) {
        res.json({[isRegister ? 'register' : 'login'] : false, massage: "Password must be more 3 characters"});
        return false;
    } 
    
    return true;
}

module.exports.checkEmail = (email, res, isRegister) => {
    const provider = email.split('@')[1];
    
    for(let i = 0; i < providers.length; i++) {
        if(providers[i] === provider) {
            return true;
        }
    }
    
    res.json({[isRegister ? 'register' : 'login'] : false, massage: "Invalid email"});
    return false;
}

module.exports.checkName = (userName, res, isRegister) => {
    if(userName.length <= 3) {
        res.json({[isRegister ? 'register' : 'login'] : false, massage: "Name must be more 3 characters"});
        return false;
    } 

    return true;
}
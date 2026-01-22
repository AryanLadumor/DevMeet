const validator = require("validator");

const validateSignUpData = (req) => {
    let { firstName, emailId, password } = req.body
    if (!firstName) {
        throw new Error("Firstname is required")
    }
    if(!emailId){
        throw new Error("Email is required")
    }
    if (!/^[a-zA-Z._]+$/.test(firstName)) {
    throw new Error("Only letters, '_' (underscore) and '.' (dot) are allowed");
    }
    if(!password){
        throw new Error("Password is required")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email address");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error(`Password is not strong enough`); 
    }
}

const validateLoginData = (req)=>{
    const {emailId , password} = req.body
    if(!emailId){
        throw new Error("Email is required")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email address");
    }
    if(!password){
        throw new Error("Password is required")
    }
}

module.exports = { 
    validateSignUpData ,
    validateLoginData
}
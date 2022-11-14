const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const Ajv = require("ajv");


const AccessControl = require("accesscontrol");
const roles = new AccessControl();

    roles.grant("user")
    .createOwn('profile')
    .readOwn("profile")
    .updateOwn("profile")

    roles.grant("admin")
    .extend("user")
    .updateAny("profile")
    .deleteAny("profile")
 



// BAD CODE: VULNERABLE
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"});
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}


exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}

// function to compare password
exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

// function hash user password
exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 8);
}

// function to create JWT
exports.createJWT = (user) => {
    const token = jwt.sign({id:user.id, username: user.username}, AppConfig.JWT_SECRET)
    return token;
}


// BAD CODE: statically typed values
exports.ajvChecker = (data)=> {
  let schema = {
      type: "object",
      properties: {
        first_name: {type: "string"},
        middle_name: {type: "string"},
        last_name: {type: "string"},
        country: {type: "string"},
        location: {type: "string"},
        phone: {type: "string"}
      },
      required: ["first_name","last_name", "country"],
      additionalProperties: false
    }
  
  const ajv = new Ajv()
  const result = ajv.validate(schema, data)

  return result;
 
}
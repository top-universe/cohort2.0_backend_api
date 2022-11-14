const Role = require("./model");
const { ajvErrorHandler } = require("../../utils/ajvErrorHandler");
const { roleSchemaValidator, roleValidator, deleteRoleValidator } = require("./schema");
const { verifyLink } = require("../../utils/token");
const { emailValidatorSchema } = require("../auth/schema");

exports.createRole = async (req, res) => {
  try {

    //destructuring the required parameters from the request body

    let { role, email, description } = req.body;

    //checking if the inputs passes the ajv schema validations

    let isValid = await roleSchemaValidator(req.body);

    if (!isValid) {

      //if the inputs doesnt pass the validations, the ajv error handler will
      // help throw the error message

      let data = ajvErrorHandler(roleSchemaValidator);
       
      throw new Error (data);
    }

    //if the inputs eventually passes the validations, then the user role
    //will be created using the function below

    const createdRole = await Role.createRole(role, email, description);

    // if the user is successfully created,
    //the user details will be sent to the frontend

    res.status(200).send(createdRole);

  } catch (err) {

    //catches any error thrown on course of the creation and verification
    //if there is any and sends it to the frontend

    res.status(400).send(err.message);
  }
};

exports.verifyRole = async (req, res) => {
  try {

    //destructuring the required parameters from the request body

    let { role, email } = req.body;

    //checking if the inputs passes the ajv schema validations

    let isValid = await roleSchemaValidator(req.body);

    if (!isValid) {

      //if the inputs doesnt pass the validations, the ajv error handler will
      // help throw the error message

      let data = ajvErrorHandler(roleSchemaValidator);

      throw new Error (data);
    }

    //if the inputs eventually passes the validations, then the user role
    //will be verified using the function below

    const verifiedRole = await Role.verifyRole(role, email);

    if (!verifiedRole) {

      //if the the user is not verified the appropriate
      //error message will be thrown

      throw new Error("No User with such entries");
    }

    // if the user is successfully created,
    //the user details will be sent to the frontend

    res.status(200).send(verifiedRole);

  } catch (err) {

    //catches any error thrown on course of the validation and verification
    //if there is any and sends it to the frontend

    res.status(400).send(err.message);
  }
};

exports.getUpdateRole = async (req, res) => {
    
  try {

     //destructuring the required parameters from the request body

     let { _id, email } = req.body;

    //validate user inputs

    const verifiedRole = await Role.validateUser( _id, email );

    if (!verifiedRole) {

        //throw error if the inputs are not validated

      throw new Error ("User with such entries is not verified.......");

    }

    // if the user is successfully verified,
    //the userRole update link will be sent to their email 

    res.status(200).json({

      success: "Update role link sent to your mail.......",

    });

    //catches any error thrown on course of the verification
    //if there is any and sends it to the frontend


  } catch (err) {

    res.status(400).json({
      error: err.message,
    });

  }

};


exports.updateRole = async (req, res) => {

  try {

    // accept reset link from the request params

     let updateRoleLink = req.params.link;

     // destructuring the required parameters (initial role, email and _id required )
     // from the request body

    let { _id, email, role } = req.body;

    //checking if the inputs passes the ajv schema validations

    let isValid = await roleValidator(req.body);

    if (!isValid) {

      //if the inputs doesnt pass the validations, the ajv error handler will
      // help throw the error message

      let data = ajvErrorHandler(roleValidator);
      throw new Error (data);

    }

    //check the validity of the updateRole reset link

    let user = await verifyLink(updateRoleLink);

    if (!user) {

        //if the links isn't verified then the error below will be thrown

        throw new Error("Link expired");

    }

    //if the link is verified the the role will be upadted

    let newRole = req.body.role;
    
    let updated = await Role.updateUser({ email }, { role: newRole });


    res.status(200).json({
      message: "User Role Successfully updated",
    });

    //catches any error thrown on course of the validation and verification
    //if there is any and sends it to the frontend

  } catch (err) {

    res.status(400).send(err.message);
  }
};

exports.getDeletRole = async (req, res) => {
 
  try {

     //destructuring the required parameters from the request body

     let { _id, email } = req.body;
    
    //validate user inputs

    const verifiedRole = await Role.deletRole(_id, email);

    if (!verifiedRole) {

        //throw error if the inputs are not validated

        throw new Error("No User with such entries");

    }

    // if the user is successfully validated,
    //the userRole delete link will be sent to their email 

    res.status(200).json({
      success: "Delete role reset link sent.......",
    });

    //catches any error thrown on course of the verification
    //if there is any and sends it to the frontend

} catch (err) {

    res.status(400).json({
      error: err.message,
    });

  }

};


exports.deleteRole = async (req, res) => {

    try {

    // accept reset link from the request params

      let roleDeleteLink = req.params.link;
  
     // destructuring the required parameters (inital role, email and _id required )
     // from the request body
  
      let { email, role } = req.body;
  
      let isValid = await deleteRoleValidator(req.body);
  
      if (!isValid) {
        
        //if the inputs doesnt pass the validations, the ajv error handler will
        // help throw the error message
  
        let data = ajvErrorHandler(deleteRoleValidator);
        throw new Error(data);

      }
  
      //check the validity of the password reset link
  
      let user = await verifyLink(roleDeleteLink);

      if (!user) {
        
        //if the links isn't verified then the error below will be thrown
        
        throw new Error("Link expired");

      }

      //if the link is verified the the role will be upadted
      
      let filter = {email: req.body.email}
      let update = {role: "user"}


      let deletedRole = await Role.roleDelete(filter, update);
  
  
      res.status(200).json({
        message: "User Role Successfully deleted",
      });
    } catch (err) {
      //catches any error thrown on course of the validation and verification
      //if there is any and sends it to the frontend
  
      res.status(400).send(err.message);

    }
    
  };

  

const { v4 } = require('uuid')
const { Schema, model } = require('mongoose')
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true})
require("ajv-formats")(ajv)


let schema = new Schema({
    _id:{
        type: String,
        default: v4()
    },
    role:{ 
        type: String,
        required: true,
    },
    email:{ 
        type: String,
        required: true,
    },
    description:{ 
        type: String,
        required: false
    }
},
{
    timestamps: true
}
)

const ajvRoleSchema = {
    type: "object",
    properties: {
      role: {type: "string", enum: ["user", "medicalAdmin", "platformAdmin"]},
      description: {type: "string"},
      email: {type: "string", format: "email"}
    },
    required: ["role", "email"],
    additionalProperties: false
  }

  const roleValidatetor = {
    type: "object",
    properties: {
      role: {type: "string", enum: ["user", "medicalAdmin", "platformAdmin"]},
      _id: {type: "string"},
      email: {type: "string", format: "email"}
    },
    required: ["role", "_id", "email"],
    additionalProperties: false
  }

  const roleDelete = {
    type: "object",
    properties: {
      role: {type: "string", enum: ["user", "medicalAdmin", "platformAdmin"]},
      email: {type: "string", format: "email"}
    },
    required: ["role", "email"],
    additionalProperties: false
  }

  const roleValidator = ajv.compile(roleValidatetor)
  
  const deleteRoleValidator = ajv.compile(roleDelete)


const roleSchemaValidator = ajv.compile(ajvRoleSchema)

const roleSchema = model("role", schema)

module.exports = { roleSchema, roleSchemaValidator, roleValidator, deleteRoleValidator };

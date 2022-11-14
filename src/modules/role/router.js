const roleRouter = require('express').Router()
const { createRole,
        deleteRole, 
        verifyRole, 
        updateRole,
        getUpdateRole,
        getDeletRole } = require('./controller')

roleRouter.post('/role/create', createRole)
roleRouter.post('/role/verify', verifyRole)
roleRouter.post('/role/update', getUpdateRole)
roleRouter.put('/role/update/:link', updateRole)
roleRouter.post('/role/delete', getDeletRole)
roleRouter.delete('/role/delete/:link', deleteRole)



module.exports = roleRouter


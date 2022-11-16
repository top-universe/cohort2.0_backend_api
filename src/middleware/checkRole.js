/**
* Verify user permission middleware
* No value is returned
* @param {Object} req - express default request object
* @param {Object} res - express default response object
* @param {Object} next - express default next function
* @param {Array} allowedRoles - Holds the list of allowed roles
*/
const verifyRoles = (allowedRoles) => {
    return function(req, res, next) {
        // req.user value is dependent on the verifyUser authorisation middleware result
        let userRoles = fetchUserRoles(req.user.id)
        
        // destructure our roles array
        const rolesArray = [...allowedRoles];

        // check if user has the role
        const result = userRoles.map(role => rolesArray.includes(role)).find(val => val === true)
        
        // throw an exception when an error occurs
        if(!result) res.status(401).json({message : "You do not have the right permissions to access this resource"})
        else {
            next()
        }
      }
}

// role test
const fetchUserRoles = (userId) => {
    return ['baby', 'user', ['admin']]
}

module.exports = {
    verifyRoles
}
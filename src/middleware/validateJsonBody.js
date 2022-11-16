const { validator } = require('../utils/validator')

exports.validateJsonBody = (schema) => {
    return async function (req, res, next) {
        try {
            let data = await validator(req.body, schema)
            if (!data.isValid) {
                throw new Error (data.error)
            }
            req.data = data
            next()
        } catch (error) {
            res.status(401).json({ message: error.message })
            return
        }
    }
}

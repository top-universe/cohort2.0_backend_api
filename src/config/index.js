const { development } = require('./development')
const { production } = require('./production')

let config = null

if (!process.env.NODE_ENV) {
    config = development
} else {
    config = (process.env.NODE_ENV === "development") ? development : production
}

global.AppConfig = config
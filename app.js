require('dotenv').config()
require('./src/config') // load config
require('./src/database') // load database
require('./src/services') // load services
const { urlencoded } = require('express'),
    {cors} = require('./src/utils/cors'),
    express = require('express'),
    app = express(),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./src/docs/spec.json')

// middleware for expired token
app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
       error: "JWT token has expired, please login to obtain a new one"
      });
     }
     res.locals.loggedInUser = await User.findById(userId);
     next();
    } else {
     next();
    }
});

// importing module routers
const auth = require('./src/modules/auth/router'),
    role = require('./src/modules/role/router'),
    booking = require('./src/modules/booking/router'),
    profile = require('./src/modules/profile/router')


// initialise modules
app.use(express.json())
    .use(cors) // loaded cors
    .use(express.urlencoded({ extended: false }))
    .use(auth, profile) // mounting modules
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // loaded swagger documentation
    .get('/', (req,res) => res.send('Everything works pretty well 🚀, powered by Top Universe'))
    .listen(AppConfig.PORT, () =>  console.log(`App is running on port ${AppConfig.PORT}`)) // launch express app

    

    module.exports.app = app;
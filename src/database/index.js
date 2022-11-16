const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const uri = AppConfig.DATABASE;
exports.client = new MongoClient(uri);


// self-invocation database function
(async function(){
    await mongoose.connect(`${AppConfig.DATABASE}/medbookly`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connected 🚀")
    }).catch(err => {
        console.log(err)
    })
})();

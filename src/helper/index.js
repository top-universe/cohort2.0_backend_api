// data helpers
const {client} = require('../database')

// check if our user exist
async function checkIfUserExists(id) {
    try {
      const database = client.db("medbookly");
      const auths = database.collection("auths");
      // Query for a user that has the id passed in here
      const query = { _id: id };
      const user = await auths.findOne(query);
      if(user) {
        return user
      }
      else {throw new Error('user does not exist')  }
    } finally {
    }
}


module.exports = {
    checkIfUserExists
}
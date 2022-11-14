EnvFile=.env
if [ -f "$EnvFile" ]; then
    echo "$EnvFile already exists. Moving on..."
else 
    # create a .env file
    touch .env
    # add environmental variables to .env local file
    echo "
    PORT=3000
    HOST=http://localhost:3000
    DATABASE=mongodb://localhost:27017
    MAILGUN_API_KEY=replaceme
    POSTMARK_API_KEY=replaceme
    JWT_SECRET=topuniversesecretkey
    SECRET=topuniversesecretkey
    FRONTEND_HOST=http://localhost:5173
    " > .env
fi


DIRECTORY="node_modules"
if [[ -d "${DIRECTORY}" && ! -L "${DIRECTORY}" ]] ; then
    echo "$DIRECTORY exists already"
    rm -r node_modules 
    # install packages
    npm install
    # run express app with nodemon
    node app.js
fi
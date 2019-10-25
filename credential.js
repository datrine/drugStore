module.exports = {
    cookieSecret: "butterfly",
    mongo: {
        development: {
            connectionString: "mongodb://localhost:27017/akoldb"
        },
        production: {
            connectionString: "mongodb://datrine:TeMi4ToPe@ds261567.mlab.com:61567/heroku_b2g7qwz1"
        }
    }
}
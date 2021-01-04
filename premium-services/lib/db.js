var MongoClient = require('mongodb').MongoClient;


var db = () => {
    var dbo;
    return {
            config: (url,dbname) => {
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    dbo = db.db(dbname);
                  }); 
            },
            getConnection: () => {
                return dbo;
            }
        }
    };

module.exports = db();
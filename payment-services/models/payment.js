const logger = require('../lib/logger');
const mongodb = require("../lib/db");

function PaymentModel() {
    return {}
};
var ObjectId = require('mongodb').ObjectID;
PaymentModel.getPremiumDetails = (id, callback) => {
    var dbo = mongodb.getConnection();
    dbo.collection("premiums").findOne({"_id": new ObjectId(id)},function(err, res) {
        if(err){
            callback(true, null);
        }else{
            callback(false, res);
        }
    });
}

PaymentModel.insertPaymentDetails = (paymentDetails, callback) => {
    var dbo = mongodb.getConnection();
    var _id;
    var premiumId = paymentDetails._id;
    delete paymentDetails._id;
    dbo.collection("payments").insertOne(paymentDetails, function(err, res) {
        if(err){
            logger.msg("INFO", "1 document inserted"+err);
            callback(true, null);
        }else{        
            _id = paymentDetails._id;
            logger.msg("INFO", "payment details inserted"+_id);
            var newvalues = { $set: { paid: true, paymentId: _id } };
            dbo.collection("premiums").updateOne({"_id": new ObjectId(premiumId)}, newvalues, function(err, res) {
                if(err){
                    logger.msg("INFO", "update premium failed "+err);
                    callback(true, null);
                }else{        
                   callback(false, _id);
                }
            });
           
        }
    });
}

module.exports = PaymentModel;

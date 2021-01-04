const express = require('express');
const logger = require('../lib/logger');
const router = express.Router();
const paymentModel = require('../models/payment');
const jsonValidator = require('../schema-validator/validator');
const nconf = require('nconf').file({file: 'config/config.json'});
var _ = require('lodash');

/* POST home page. */
router.post('/premium/:id', function(req, res) {
   jsonValidator.isValid(req.body, function(isValid, errorReason){
    if(!isValid){
      logger.msg("ERROR", "Error at schema validation");
      res.status(400).send(errorReason);
    }else{
      paymentModel.getPremiumDetails(req.params.id, function(err, premium){
        if(err){
          logger.msg("ERROR", "Error at premium retrievel") 
          res.sendStatus(500);
        }else{
          if(premium !== undefined && premium.paid === undefined){
            var paymentDetails = Object.assign(premium, { paid: true });
            paymentModel.insertPaymentDetails(paymentDetails, function(err, id){
             if(err){
              logger.msg("ERROR", "Error at payment insertion"+err) 
              res.sendStatus(500);
             }else{
              res.json({ status: "success", referrence: id });   
             }
           });
          }else{
            res.json({ status: "unknown premium details or premium already paid" }); 
          }
        }
      });
    }
  });
});

module.exports = router;
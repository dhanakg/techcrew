const express = require('express');
const logger = require('../lib/logger');
const router = express.Router();
const insuranceModel = require('../models/insurance');
const jsonValidator = require('../schema-validator/validator');
const nconf = require('nconf').file({file: 'config/config.json'});
var _ = require('lodash');

/* POST Premium calulcation details. */
router.post('/premium/calculation', function(req, res) {
   
  // Validate the json schema
   jsonValidator.isValid(req.body, function(isValid, errorReason){
    if(!isValid){
      logger.msg("ERROR", "Error at schema validation");
      res.status(400).send(errorReason);
    }else{
      //Base Premium Calulation
      insuranceModel.getBasePremium(function(err, premium){
        if(err){
          logger.msg("ERROR", "Error at base premium calculation") 
          res.sendStatus(500);
        }else{
          //Age wise Premium Calulation
          insuranceModel.getPremiumByAge(premium, req.body.age, function (err, premium){
            if(err){
              logger.msg("ERROR", "Error at age wise premium calculation")
              res.sendStatus(500);
            }else{
              //Gender wise Premium Calulation
              insuranceModel.getPremiumByGender(premium, req.body.gender, function (err, premium){
                if(err){
                  logger.msg("ERROR", "Error at gender wise premium calculation")
                  res.sendStatus(500);
                }else{
                  //Premium Calulation based on pre-existing conditions
                  insuranceModel.getPremiumByExistingDisease(premium, req.body.healthConditions, function(err, premium){
                    if(err){
                      logger.msg("ERROR", "Error at precondition wise premium calculation")
                      res.sendStatus(500);
                    }else{
                      //Premium Calulation based on habits
                      insuranceModel.getPremiumByHabits(premium, req.body.habits, function (err, premium){
                        if(err){
                          logger.msg("ERROR", "Error at habits wise premium calculation")
                          res.sendStatus(500);
                        }else{
                          //store the details into db for further payments
                          var premiumDetails = Object.assign(req.body,{ premium: premium})
                          insuranceModel.insertPremiumDetails(premiumDetails, function(id){
                            res.json({ premium: premium, payment: nconf.get("paymentService").url+"/premium/"+id });
                          });
                        }
                      })
                    }
                  });
                }
              })
            }
          });
        }
      });
    }
  });
});

module.exports = router;
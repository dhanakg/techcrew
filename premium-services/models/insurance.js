const logger = require('../lib/logger');
const rules  = require('../rules')
var _ = require('lodash');
const { isArray } = require('lodash');
const mongodb = require("../lib/db");

function InsuranceModel() {
    return {}
};

/**
* function used to get the base premium amount from rules
* @name getBasePremium
* @param callback - A callback function assign the base premium and callback to next
* @author tamilselvan.p
*/
InsuranceModel.getBasePremium = ( callback ) => {
    callback(false, rules.BASE_PREMIUM);
};

/**
* function used to get the premium amount based on the customer age from rules
* @name getPremiumByAge
* @param premium - Premium amount 
* @param customerAge - Age of customer
* @param callback - A callback function to next method
* @author tamilselvan.p
*/
InsuranceModel.getPremiumByAge = (premium, customerAge, callback ) => {
    var ageWisePremium = rules.AGE;
    for (var slab in ageWisePremium) {
        if (ageWisePremium.hasOwnProperty(slab)) {
            var ageLimit = slab.split("-");
            if(customerAge < ageLimit[0]){
                break;
            }else if(customerAge > ageLimit[1]){
                premium += premium * (ageWisePremium[slab]/100);
                logger.msg("INFO", "Premium calulating for age "+ customerAge+" for slab "+ slab + " with "+ ageWisePremium[slab]+" % = " + premium );
            }else if(_.range(ageLimit[0],(Number(ageLimit[1])+1),1).indexOf(Number(customerAge)) >= 0){
                premium += premium * (ageWisePremium[slab]/100);
                logger.msg("INFO", "Premium calulating for age "+ customerAge+" for slab "+ slab + " with "+ ageWisePremium[slab]+" % = " + premium );
            }
        }
    }
    //Age Beyond Calculation
    if(customerAge >  rules.BEYOND_AGE.AGE){
       var noOfAccumulativeIncrease = _.ceil((customerAge - rules.BEYOND_AGE.AGE) / rules.BEYOND_AGE.STEP);
       logger.msg("INFO", "Premium calulating for beyond age limit: Total Times = " + noOfAccumulativeIncrease); 
       for(i=1; i<=noOfAccumulativeIncrease;i++){
        premium += premium * (rules.BEYOND_AGE.PER/100);
        logger.msg("INFO", "Premium calulating for age "+ customerAge+" for slab "+ ((rules.BEYOND_AGE.AGE + (i*rules.BEYOND_AGE.STEP))- rules.BEYOND_AGE.STEP)+ "-"+(rules.BEYOND_AGE.AGE + (i*rules.BEYOND_AGE.STEP)) +" with "+ rules.BEYOND_AGE.PER+" % = " + premium );
       }
    }

    callback(false,_.round(premium,2));
};

/**
* function used to calculate the premium amount based on the customer gender from rules
* @name getPremiumByGender
* @param premium - Premium amount 
* @param customerGender - Gender of customer
* @param callback - A callback function to next method
* @author tamilselvan.p
*/
InsuranceModel.getPremiumByGender = (premium, customerGender, callback ) => {
    var gender = rules.GENDER;
    for (var slab in gender) {
        if (gender.hasOwnProperty(slab)) {
            if(slab.indexOf(customerGender.toUpperCase()) >= 0){
                premium += premium * (gender[slab]/100);
                logger.msg("INFO", "Premium calulating for gender "+ customerGender+" for slab "+ slab + " with "+ gender[slab]+" % = " + premium );
            }
        }
    }
    callback(false,_.round(premium,2));
};

/**
* function used to calculate the premium amount based on the customer pre existing disease from rules
* @name getPremiumByExistingDisease
* @param premium - Premium amount 
* @param customerDisease - Customer pre-existing disease
* @param callback - A callback function to next method
* @author tamilselvan.p
*/
InsuranceModel.getPremiumByExistingDisease = (premium, customerDisease, callback ) => {
    var exisingDiseases = rules.EXISTING_DISEASE;
    for (var slab in customerDisease) {
        if (customerDisease.hasOwnProperty(slab)) {
            if(customerDisease[slab].toUpperCase() === "YES"){
                if(exisingDiseases.hasOwnProperty(slab.toUpperCase())){
                    premium += premium * (exisingDiseases[slab.toUpperCase()]/100);
                    logger.msg("INFO", "Premium calulating for existing condition "+ slab + " with "+ exisingDiseases[slab.toUpperCase()]+" % = " + premium );
                }
            }
        }
    }
    callback(false,_.round(premium,2));
};

/**
* function used to calculate the premium amount based on the customer habits from rules
* @name getPremiumByHabits
* @param premium - Premium amount 
* @param customerDisease - Customer Habits
* @param callback - A callback function to next method
* @author tamilselvan.p
*/
InsuranceModel.getPremiumByHabits = (premium, customerHabits, callback ) => {
    var habits = rules.HABITS;
    for (var slab in customerHabits) {
        if (customerHabits.hasOwnProperty(slab)) {
            if(customerHabits[slab].toUpperCase() === "YES"){
                if(habits.hasOwnProperty(slab.toUpperCase())){
                    premium += (premium * (habits[slab.toUpperCase()]/100));
                    logger.msg("INFO", "Premium calulating for habits "+ slab + " with "+ habits[slab.toUpperCase()]+" % = " + premium );
                }
            }
        }
    }
    callback(false,_.round(premium,2));
};

/**
* function used to store the premium details in mongo db for further payments
* @name insertPremiumDetails
* @param premiumDetails - Premium details 
* @param callback - A callback function to next method
* @author tamilselvan.p
*/
InsuranceModel.insertPremiumDetails = (premiumDetails, callback) => {
    var dbo = mongodb.getConnection();
    var _id;
    dbo.collection("premiums").insertOne(premiumDetails, function(err, res) {
        _id = premiumDetails._id;
        logger.msg("INFO", "1 document inserted"+_id);
        callback(_id);
    });
}

module.exports = InsuranceModel;

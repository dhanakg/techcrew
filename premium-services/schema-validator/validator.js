const logger = require('../lib/logger');
var Validator = require('jsonschema').Validator;

module.exports = SchemaValidator;

function SchemaValidator() {
};

SchemaValidator.InsuranceRequest = {
    id: "/InsuranceRequest",
    type: 'object',
    properties: {
      name: {
        required: true,
        type: 'string'
      },
      age: {
        required: true,
        type: 'integer',
        minimum: 1
      },
      gender: {
        required: true,
        type: 'string',
        enum: ["Male", "Female","Others"]
      },
      healthConditions: {
        "$ref": "/HealthConditions",
        required: true
      },
      habits: {
        "$ref": "/Habits",
        required: true
      }
    }
  };

  SchemaValidator.HealthConditions = {
    id: "/HealthConditions",
    type: "object",
    properties: {
      "hypertension": {
        type: "string", 
        enum: ["yes", "no"],
        required: true
      },
      "bloodpressure":{
        type: "string", 
        enum: ["yes", "no"],
        required: true
      },
      "bloodsugar": {
        type: "string", 
        enum: ["yes", "no"],
        required: true
      },
      "overweight": {
        type: "string", 
        enum: ["yes", "no"],
        required: true
      }
    }
  };

  SchemaValidator.Habits = {
    "id": "/Habits",
    "type": "object",
    properties: {
      "exercise": {
        type: "string", 
        enum: ["yes", "no"],
        required: true
      },
      "smoking":{
        type: "string", 
        enum: ["yes", "no"],
        required: true
      },
      "alcohol": {
        type: "string", 
        enum: ["yes", "no"],
        required: true
      },
      "drugs": {
        type: "string", 
        enum: ["yes", "no"],
        required: true
      }
    }};


  SchemaValidator.isValid = function (reqData, fCallback) {
    var v = new Validator();
    v.addSchema(SchemaValidator.HealthConditions, '/HealthConditions');
    v.addSchema(SchemaValidator.Habits, '/Habits'); 
    var result = v.validate(reqData, SchemaValidator.InsuranceRequest);
    if(result.valid){
      logger.msg('INFO', '*** ValidateData.isValidRequestData -- TRUE: ');
      fCallback(true, "");
    }else{
      var errors = result.errors;
      var message = [];
      if (errors) {
        if (!Array.isArray(errors)) {
            errors = new Array(errors);
        }
        for (var j = 0; j < errors.length; j++) {
            var error = JSON.stringify(errors[j]);
            var property = error.property;
            logger.msg('INFO', '*** ValidateData.isValidRequestData -- ERROR :\n' + error);
           // break;
           message.push({
            [errors[j].property]:errors[j].message
           })
        }
        fCallback(false, message);
      }
    }
};
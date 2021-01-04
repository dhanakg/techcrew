const logger = require('../lib/logger');
var Validator = require('jsonschema').Validator;

module.exports = SchemaValidator;

function SchemaValidator() {
};

SchemaValidator.PaymentRequest = {
    id: "/PaymentRequest",
    type: 'object',
    properties: {
      premium: {
        required: true,
        type: 'string'
      }
    }
  };

  SchemaValidator.isValid = function (reqData, fCallback) {
    var v = new Validator();
    var result = v.validate(reqData, SchemaValidator.PaymentRequest);
    if(result.valid){
      logger.msg('INFO', 'Request is valid');
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
            logger.msg('INFO', 'Request is invalid ERROR :\n' + error);
           // break;
           message.push({
            [errors[j].property]:errors[j].message
           })
        }
        fCallback(false, message);
      }
    }
};
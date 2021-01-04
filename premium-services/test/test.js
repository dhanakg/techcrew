var assert = require('assert');
const insuranceModel = require('../models/insurance');
const rules  = require('../rules')
describe('PremiumCalulation', function() {
  describe('BasePremium', function() {
    it('should return the base premium value specified in the rule definition', function(done) {
      insuranceModel.getBasePremium(function(err, premium){
        assert.strictEqual(premium, rules.BASE_PREMIUM );
        done();
      })
    });
  });
  describe('AgeWisePremium', function() {
    it('should return the premium value based on age defined in the rule definition', function(done) {
      insuranceModel.getPremiumByAge(5000, 34, function(err, premium){
        assert.strictEqual(premium, 6655);
        done();
      })
    });
  });
  describe('GenderWisePremium', function() {
    it('should return the premium value based on gender defined in the rule definition', function(done) {
      insuranceModel.getPremiumByGender(5000, "male", function(err, premium){
        assert.strictEqual(premium, 5100);
        done();
      })
    });
  });
  describe('PremiumByPreCondition', function() {
    it('should return the premium value based on customer pre condition defined in the rule definition', function(done) {
      insuranceModel.getPremiumByExistingDisease(5000, { hypertension: "yes", bloodpressure: "yes", bloodsugar: "yes", overweight: "yes"}, function(err, premium){
        assert.strictEqual(premium, 5203.02);
        done();
      })
    });
  });
  describe('PremiumByHabits', function() {
    it('should return the premium value based on customer pre condition defined in the rule definition', function(done) {
      insuranceModel.getPremiumByHabits(10000, { exercise: "yes", smoking: "no", alcohol: "no", drugs: "no"}, function(err, premium){
        assert.strictEqual(premium, 9700);
        done();
      })
    });
  });
});

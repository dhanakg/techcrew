'use strict';


module.exports = {
    "BASE_PREMIUM" : 5000,
    "AGE" : {
        "18-25": 10,
        "26-30": 10,
        "31-35": 10,
        "36-40": 10
    },
    "BEYOND_AGE" : {
        "AGE": 40,
        "PER" : 20,
        "STEP": 5
    },// meaning for every 5 years +20% i.e 41-50 = 20, 51-55 = 20
    "GENDER" : {
        "MALE": 2
    },
    "EXISTING_DISEASE" : {
        "HYPERTENSION": 1,
        "BLOODPRESSURE": 1,
        "BLOODSUGAR": 1,
        "OVERWEIGHT": 1
    },
    "HABITS" : {
        "SMOKING": 3,
        "ALCOHOL": 3,
        "EXERCISE": -3,
        "DRUGS": 3
    }
}
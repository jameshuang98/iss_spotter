// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised')
const { nextISSTimesForMyLocation } = require('./iss_promised')
const { printPassTimes } = require('./printPassTimes')

nextISSTimesForMyLocation()
    .then((passTimes) => { // only way to get values from promise is a .then
        printPassTimes(passTimes)
    })
    .catch((error) => {
        console.log('There was an error', error.message)
    });

// console.log(nextISSTimesForMyLocation()) ----> output: Promise {<pending>}


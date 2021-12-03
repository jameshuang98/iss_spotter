// const { fetchMyIP } = require('./iss')
// const { fetchCoordsByIP } = require('./iss')
// const { fetchISSFlyOverTimes } = require('./iss')

// fetchMyIP((error, ip) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
  
//     console.log('It worked! Returned IP:' , ip);
//   });

// fetchCoordsByIP('50.92.209.213', (error, coordinates) => {
//     if (error) {
//         console.log('There was an error!', error)
//         return;
//     }

//     console.log('It worked! Returned Coordinates are:', coordinates);
// })

// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, times) => {
//     if (error) {
//         console.log('There was an error!', error)
//         return;
//     }

//     console.log('It worked! Returned fly-over times are:', times);
// })


const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
        const datetime = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  
nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
        return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
}); 
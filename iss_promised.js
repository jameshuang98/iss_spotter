const request = require('request-promise-native'); // same as other request library but accepts promises instead of using callbacks

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
    return request('https://api.ipify.org?format=json');
};
  

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
    let IP = JSON.parse(body).ip
    return request('https://freegeoip.app/json/' + IP);
};

/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from freegeoip.app
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
    const {latitude, longitude} = JSON.parse(body)
    return request('http://api.open-notify.org/iss-pass.json?lat=' + latitude +'&lon=' + longitude);
};

/* 
 * Input: None
 * Returns: Promise for fly over data for users location
 */
const nextISSTimesForMyLocation = function() {
    return fetchMyIP() // returns out of nextISS function
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
        const { response } = JSON.parse(data);
        return response; // returns out of promise chain
    })
    

};

module.exports = { 
    nextISSTimesForMyLocation
}; // good practice use export objects



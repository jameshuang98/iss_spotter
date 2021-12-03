const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
 const fetchMyIP = function(callback) { 
    let IP_Api = 'https://api64.ipify.org?format=json'
    request(IP_Api, (error, response, body) => {
        
        // error can be set if invalid domain, user is offline, etc.
        if (error) {
            callback(error, null);
            return;
        };
        //if non-200 status, assume server error
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        const data = JSON.parse(body);
        // console.log(data)
        callback(error, data['ip'])
    })
 };



/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
 const fetchCoordsByIP = function(ip, callback) { 
    let Geo_Api = 'https://freegeoip.app/json/'
    request(Geo_Api + ip, (error, response, body) => {
        
        // error can be set if invalid domain, user is offline, etc.
        if (error) {
            callback(error, null);
            return;
        };
        //if non-200 status, assume server error
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }

        const {latitude, longitude} = JSON.parse(body)
        // data['latitude'] = JSON.parse(body['latitude']);
        // data['longitude'] = JSON.parse(body['latitude']);
        callback(error, {latitude, longitude})
    })
 };


 /**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
    
    request('https://iss-pass.herokuapp.com/json/?lat=' + coords.latitude +'&lon=' + coords.longitude, (error, response, body) => {
        
        // error can be set if invalid domain, user is offline, etc.
        if (error) {
            callback(error, null);
            return;
        };
        //if non-200 status, assume server error
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        const passes = JSON.parse(body).response;
        callback(null, passes);
    })
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            return callback(error, null);
        }
  
        fetchCoordsByIP(ip, (error, loc) => {
            if (error) {
                return callback(error, null);
            }
  
            fetchISSFlyOverTimes(loc, (error, nextPasses) => {
                if (error) {
                    return callback(error, null);
                }
  
                callback(null, nextPasses);
            });
        });
    });
};

module.exports = { 
    nextISSTimesForMyLocation
 };
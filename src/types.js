/**
 * @typedef {Object} OutputObj
 * 
 * @prop {NetworkObj} network
 * @prop {TypicalObj} memory
 * @prop {TypicalObj} cpu
 * @prop {BatteryObj} battery
 * @prop {WeatherObj} weather
 */

/**
 * @typedef {Object} NetworkObj
 * 
 * @prop {GatewayObj} defautlGateway
 * @prop {TrafficObj} traffic
 * 
 */

/**
 * @typedef {Object} GatewayObj
 * 
 * @prop {string} ssid
 */

/**
 * @typedef {Object} TrafficObj
 * 
 * @prop {TrafficDataObj} traffic
 * @prop {TrafficDataObj} transmitted
 */

/**
 * @typedef {Object} TrafficDataObj
 * 
 * @prop {number} siValue
 * @prop {string} siUnit
 */

/**
 * @typedef {Object} TypicalObj
 * 
 * @prop {number} usage
 */

/**
 * @typedef {Object} BatteryObj
 * 
 * @prop {boolean} isCharging
 * @prop {number} chargePercent
 */

/**
 * @typedef {Object} WeatherObj
 * 
 * @prop {string} status
 * @prop {number} celsiusTemp
 */
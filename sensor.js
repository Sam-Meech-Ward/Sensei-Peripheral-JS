const sensor = require('node-dht-sensor');

const sensorType = 22;
const gpioPin = 4;

/**
 * Start reading data from the dht temperature sensor.
 */
function read() {
  return new Promise((resolve, reject) => {
    sensor.read(sensorType, gpioPin, (err, temperature, humidity) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({temperature, humidity});
    });
  });
}
exports.read = read;
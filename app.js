const sensor = require('./sensor');
const ble = require('./ble');

function start() {
  sensor.read()
    .then(({temperature, humidity}) => {
      console.log(temperature, humidity);
      const buffer = ble.advertisementData(temperature, humidity);
      return ble.startAdvertising(buffer);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Ahhhhhhhh", error);
    });
}

setInterval(start, 1000);

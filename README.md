# Sensei 

The JavaScript temperature sensor.

It advertises its temperature and humidity from a dht sensor over a ble advertising packet using the Manufacturer Specific Data:

```
Manufacturer Specific Data: 0xFF
temperature: 8 byte little endian double
humidity: 8 byte little endian double
```

## Setup

* Follow along with the instructions to get setup with the temperature sensor: https://gist.github.com/meech-ward/d7974f565113719ab192e5f6bce3e271#file-instructions-md
* Install the [`bleno`](https://github.com/noble/bleno) system prerequisites on your raspberry pi `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`
* Clone or download this project onto your pi.
* Update the data in the `sensor.js` file to match your sensor.
* Run `node app.js` to start the app. 

You should see your temperature and humidity in the console. Your pi will also be emitting bluetooth temperature data that you can detect with an app like [LightBlue](https://itunes.apple.com/ca/app/lightblue-explorer/id557428110?mt=8) or use the accompanying [iOS app](https://github.com/Sam-Meech-Ward/Sensei-Central-iOS).

Or, if you're up for the challenge, you could build a detector on your personal computer using node and the [noble](https://github.com/noble/noble) library. The code will be similar to the iOS app's code.


## Files

### sensor.js

Detect temperature and humidity.

Call the `read` function on this module to read temperature and humidity data from a dht sensor.

Dependent on the `node-dht-sensor` library.

### ble.js

Advertise a BLE packet.

Use the `advertisementData` function to create a buffer with the temperature and humidity data. Call the `startAdvertising` to function to start advertising the data. Subsequent calls to `startAdvertising` will restart advertising with new data.

Example:

```js
// Create a 31 byte advertising buffer with the temperature and humidity data
const buffer = ble.advertisementData(temperature, humidity);
// Start advertising that data
return ble.startAdvertising(buffer);
```


Dependent on the `bleno` library.

### app.js

Requests new temperature data every 1 second and broadcasts that data through a ble advertising packet.
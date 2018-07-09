# Sensei 

The JavaScript temperature sensor.

It advertises its temperature and humidity from a dht sensor over a ble advertising packet using the Manufacturer Specific Data:

```
Manufacturer Specific Data: 0xFF
temperature: 8 byte little endian double
humidity: 8 byte little endian double
```

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
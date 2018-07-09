const bleno = require('bleno');

let state;
bleno.on('stateChange', (s) => {
  state = s;
  if (state !== 'poweredOn') {
    bleno.stopAdvertising();    
  }
});

/**
 * Start or restart advertising with custom data.
 * @param {A 31 byte buffer compatible with the ble advertising spec} buffer 
 */
function startAdvertising(buffer) { 
  return new Promise((resolve, reject) => {
    bleno.stopAdvertising();  
    if (state !== 'poweredOn') {
      reject(new Error("not powered on"));
      return;
    }
    bleno.startAdvertisingWithEIRData(buffer, (error) => {
      if (error) {
        reject(error);
        return;
      } 
      resolve("😎");
    });
  });
}
exports.startAdvertising = startAdvertising;

/**
 * Create a new 31 byte buffer with temperature and humidity data.
 * For more information about how this function works, check out the following links:
 * https://www.bluetooth.com/specifications/assigned-numbers/generic-access-profile
 * https://www.silabs.com/community/wireless/bluetooth/knowledge-base.entry.html/2017/02/10/bluetooth_advertisin-hGsf
 * @param {A Double} temperature 
 * @param {A Double} humidity 
 */
function advertisementData(temperature, humidity) {
  if (typeof temperature !== 'number' || typeof humidity !== 'number') {
    throw 'a fit';
  }

  const buffer = Buffer.alloc(31); // maximum 31 bytes

  let bufferIndex = 0;

  // flags
  buffer.writeUInt8(2, bufferIndex++);
  buffer.writeUInt8(0x01, bufferIndex++);
  buffer.writeUInt8(0x06, bufferIndex++);

  // Complete Local Name
  const name = "Sensei"
  buffer.writeUInt8(1+name.length, bufferIndex++);
  buffer.writeUInt8(0x09, bufferIndex++);
  buffer.write(name, bufferIndex);
  bufferIndex += name.length;
  
  // Manufacturer Specific Data
  // 4 bytes for each number
  buffer.writeUInt8(1+8+8, bufferIndex++);
  buffer.writeUInt8(0xFF, bufferIndex++);
  buffer.writeDoubleLE(temperature, bufferIndex);
  bufferIndex+=8;
  buffer.writeDoubleLE(humidity, bufferIndex);
  bufferIndex+=8;

  return buffer;

  // https://www.bluetooth.com/specifications/assigned-numbers/generic-access-profile
}
exports.advertisementData = advertisementData;
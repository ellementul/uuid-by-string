import jsSHA from 'jssha'

/** List of hex digit for fast accessing by index */
var HEX_DIGITS = '0123456789abcdef'.split('');

var uint8ToHex = function (ubyte) {
  var first = ubyte >> 4;
  var second = ubyte - (first << 4);

  return HEX_DIGITS[first] + HEX_DIGITS[second];
};

var uint8ArrayToHex = function (buf) {
  var out = '';

  for (var i = 0; i < buf.length; i++) {
    out += uint8ToHex(buf[i]);
  }

  return out;
}

var sha1Hash = function (text) {
  const shaObj = new jsSHA("SHA-1", "TEXT", { encoding: "UTF8" })
  shaObj.update(text)
  return shaObj.getHash("UINT8ARRAY")
}

var hashToUuid = function (hashBuffer) {
  return (
    // The low field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(0, 4)) +
    '-' +
    // The middle field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(4, 6)) +
    '-' +
    // The high field of the timestamp multiplexed with the version number
    uint8ToHex((hashBuffer[6] & 0x0f) | parseInt(5 * 10, 16)) +
    uint8ToHex(hashBuffer[7]) +
    '-' +
    // The high field of the clock sequence multiplexed with the variant
    uint8ToHex((hashBuffer[8] & 0x3f) | 0x80) +
    // The low field of the clock sequence
    uint8ToHex(hashBuffer[9]) +
    '-' +
    //  The spatially unique node identifier
    uint8ArrayToHex(hashBuffer.slice(10, 16))
  );
};

export {
  sha1Hash,
  hashToUuid
}

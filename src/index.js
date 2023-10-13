import {
  sha1Hash,
  hashToUuid
} from './lib.js'

/** Uin8Array with zero items */
var EMPTY_UINT8_ARRAY = new Uint8Array(0);

function generateUuid(target) {
  if (typeof target !== 'string') {
    throw TypeError('Value must be string');
  }

  // Getting hash
  var hash = sha1Hash(target)
  return hashToUuid(hash)
}

/**
 * Export module
 */
export default generateUuid

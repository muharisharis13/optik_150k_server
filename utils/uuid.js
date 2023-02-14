const { version: uuidVersion } =require('uuid') ;
const { validate: uuidValidate } =require('uuid') ;

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

module.exports = uuidValidateV4;


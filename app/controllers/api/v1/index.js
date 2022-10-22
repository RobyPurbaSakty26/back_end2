/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const car = require('./car');
const auth = require('./authControler');

module.exports = {
  car,
  auth,
};

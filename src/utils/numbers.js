/*
 * Helper file by Rogers Vizcaino
 * rvizcaino@gmail.com
 */

function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export {
  randomIntBetween
}

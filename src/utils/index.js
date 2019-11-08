const colors = require("colors");

const green = message => console.log(colors.green(message));
const yellow = message => console.log(colors.yellow(message));
const red = message => console.error(colors.red(message));

module.exports = { green, yellow, red };

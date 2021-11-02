const roundTo = require("round-to");

let padding = function (value) {
  if (isNaN(parseFloat(value))) {
    return "-";
  }
  return roundTo(value, 2).toPrecision(3);
};

let round = function (value) {
  return roundTo(value, 2);
};

module.exports = {
  padding,
  round,
};

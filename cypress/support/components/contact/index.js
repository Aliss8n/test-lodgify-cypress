const input = require("./input");
const button = require("./button");
const select = require("./select");
const container = require("./container");

export default {
  ...input.default,
  ...select.default,
  ...button.default,
  ...container.default,
};

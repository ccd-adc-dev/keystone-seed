const createMediaItems = require("./seed/createMediaItems")

module.exports = async keystone => {
  createMediaItems(keystone);
};

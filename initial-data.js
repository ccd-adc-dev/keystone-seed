const createUsers = require("./seed/createUsers")
const createMediaItems = require("./seed/createMediaItems")

module.exports = async keystone => {
  createUsers(keystone);
  createMediaItems(keystone);
};

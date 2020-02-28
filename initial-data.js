const createFirstUser = require('./createFirstUser')
const seed = require('./seed')

module.exports = async keystone => {
  // Count existing users
  await createFirstUser(keystone)
  await seed(keystone)
};

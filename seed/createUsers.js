const crypto = require('crypto');
const randomString = () => crypto.randomBytes(6).hexSlice();

const createUsers = async keystone => {
  const usersMetaQuery = await keystone.executeQuery(
    `query {
      _allUsersMeta {
        count
      }
    }`
  );

  let usersCount = usersMetaQuery.data ?
    usersMetaQuery.data._allUsersMeta?
      usersMetaQuery.data._allUsersMeta.count
      : null
  : null
  

  if (usersCount === 0) {
    const password = randomString();
    const email = 'admin@example.com';

    await keystone.executeQuery(
      `mutation initialUser($password: String, $email: String) {
            createUser(data: {name: "Admin", email: $email, isAdmin: true, password: $password}) {
              id
            }
          }`,
      {
        variables: {
          password,
          email,
        },
      }
    );

    console.log(`

User created:
  email: ${email}
  password: ${password}
Please change these details after initial login.
`);
  }
}

module.exports = createUsers

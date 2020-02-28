const seed = async (keystone) => {
  await keystone.createItems({
    Post: [
      { title: 'Hello Everyone' },
      { 
        title: 'Talking about React',
        author: {
          skip: 2
        }
      },
      { 
        title: 'React is the Best',
        author: {
          skip: 1
        }
      },
      { title: 'KeystoneJS Rocks' },
    ],
    User: [
      {
        name: 'John Duck',
        email: 'john@duck.com',
        password: 'dolphins',
        posts: { where: { title_contains: 'React' } },
      },
      {
        name: 'Barry',
        email: 'bartduisters@bartduisters.com',
        password: 'dolphins',
      },
    ],
  });
}

module.exports = seed
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
<<<<<<< HEAD
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

=======
const { Text, Checkbox, Password, Relationship } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
>>>>>>> e1cf4a276724741fa076359c3a3ab72d3b212784
const initialiseData = require('./initial-data');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

<<<<<<< HEAD
const MediaItem = require('./models/MediaItem')


const PROJECT_NAME = 'seed-test';
const adapterConfig = { mongoUri: 'mongodb://localhost/seed-test' };


const staticPath = "/uploads"
const staticSrc = "./uploads"

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
=======
const PROJECT_NAME = "keystone-seed";


const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
>>>>>>> e1cf4a276724741fa076359c3a3ab72d3b212784
  onConnect: initialiseData,
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
<<<<<<< HEAD

=======
>>>>>>> e1cf4a276724741fa076359c3a3ab72d3b212784
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
<<<<<<< HEAD

=======
>>>>>>> e1cf4a276724741fa076359c3a3ab72d3b212784
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
<<<<<<< HEAD
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
=======
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
    posts: {
      type: Relationship,
      ref: 'Post.author',
      many: true,
    },
  },
>>>>>>> e1cf4a276724741fa076359c3a3ab72d3b212784
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

<<<<<<< HEAD
keystone.createList('MediaItem', MediaItem);

=======
keystone.createList('Post', {
  fields: {
    title: {
      type: Text,
    },
    author: {
      type: Relationship,
      ref: 'User.posts',
    },
  },
});
>>>>>>> e1cf4a276724741fa076359c3a3ab72d3b212784

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
<<<<<<< HEAD
    new StaticApp({
      path: staticPath,
      src: staticSrc,
      // fallback: 'index.html'
    }),
=======
>>>>>>> e1cf4a276724741fa076359c3a3ab72d3b212784
  ],
};

const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const initialiseData = require('./initial-data');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const MediaItem = require('./models/MediaItem')


const PROJECT_NAME = 'seed-test';
const adapterConfig = { mongoUri: 'mongodb://localhost/seed-test' };


const staticPath = "/uploads"
const staticSrc = "./uploads"

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  onConnect: initialiseData,
});

keystone.createList('MediaItem', MediaItem);

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
    }),
    new StaticApp({
      path: staticPath,
      src: staticSrc,
      // fallback: 'index.html'
    }),
  ],
};

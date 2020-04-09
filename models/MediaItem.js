const { Text, File } = require('@keystonejs/fields');


const { LocalFileAdapter } = require('@keystonejs/file-adapters');


const fileAdapter = new LocalFileAdapter({
  src: './uploads',
  path: '/uploads',
});


module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: false,
    },  
    file: {
        type: File,
        adapter: fileAdapter,
        isRequired: false,
    },  

  },
  
  labelField: "name",

  singular: "MediaItem",
  plural: "MediaItems",

  itemQueryName: "MediaItem",
  listQueryName: "MediaItems"
  
};
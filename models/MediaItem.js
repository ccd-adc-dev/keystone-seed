const { Text, File } = require('@keystonejs/fields');
const { Content } = require('@keystonejs/field-content');

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
    content: {
      type: Content,
      blocks: [
        Content.blocks.blockquote,
        Content.blocks.image,
        Content.blocks.link,
        Content.blocks.orderedList,
        Content.blocks.unorderedList,
        Content.blocks.heading,
      ],
    }

  },
  
  labelField: "name",

  singular: "MediaItem",
  plural: "MediaItems",

  itemQueryName: "MediaItem",
  listQueryName: "MediaItems"
  
};
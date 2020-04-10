const { Text, File } = require('@keystonejs/fields');
const { Content } = require('@keystonejs/field-content');

const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
  src: './uploads',
  path: '/uploads',
});


function slugify (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

const resolveInput = async ({
  operation,
  existingItem,
  originalInput,
  resolvedData,
  context,
  actions,
}) => {
  if (operation == 'create') {
    console.log("originalInput",originalInput);

    return {
      ...resolvedData,
      slug: slugify(resolvedData.name)
    }
  }
}



module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: false,
    },  
    slug: {
      type: Text,
      label: "Slug (Identificador)",
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
  
  hooks: {
    resolveInput
  },

  labelField: "name",

  singular: "MediaItem",
  plural: "MediaItems",

  itemQueryName: "MediaItem",
  listQueryName: "MediaItems"
  
};
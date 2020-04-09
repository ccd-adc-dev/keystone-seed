const fs = require('fs');
const { Readable } = require('stream');

function bufferToStream(buffer) {
  const newStream = new Readable();
  newStream.push(buffer);
  newStream.push(null);
  return newStream;
}

const crypto = require('crypto');
const randomString = () => crypto.randomBytes(6).hexSlice();

const createMediaItems = async keystone => {
  const mediaItemsMetaQuery = await keystone.executeQuery(
    `query {
      _allMediaItemsMeta {
        count
      }
    }`
  );

  let mediaItemsCount = mediaItemsMetaQuery.data ?
    mediaItemsMetaQuery.data._allMediaItemsMeta?
      mediaItemsMetaQuery.data._allMediaItemsMeta.count
      : null
  : null
  

  if (mediaItemsCount === 0) {
    const name = randomString();

    filename = "test.jpg"
    fileType = filename.split('.')[1]
    encodingRead = "utf8"
    encoding = "7bit"
    mimetype = fileType == 'png' ? 'image/png' : 'image/jpeg'
    const buffer = Buffer(await fs.readFileSync(filename))

    const file = { createReadStream: () => bufferToStream(buffer), filename, mimetype, encoding }
    // const file = await fs.readFileSync('/home/furenku/Desktop/image-placeholder.jpg');

    const content = {
      create: {
        document: "{\"object\":\"document\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"heading\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"text\":\"asdasd\",\"marks\":[]}]},{\"object\":\"block\",\"type\":\"blockquote\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"text\":\"ASdasdasd\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"text\":\"\",\"marks\":[]}]}]}"
      }
    }
    const response = await keystone.executeQuery(
      `mutation initialMediaItem($name: String, $file: Upload, $content: _ContentTypeMediaItemContentRelateToOneInput) {
            createMediaItem(data: {name: $name, file: $file, content:$content}) {
              id
            }
          }`,
      {
        variables: {
          name,
          file,
          content,
        },
      }
    );

    console.log("response:",response);
  }
}

module.exports = createMediaItems

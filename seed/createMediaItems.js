const fs = require('fs');
const createReadStream = fs.createReadStream;
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
    const file = createReadStream('/home/furenku/Desktop/image-placeholder.jpg');
    // const file = await fs.readFileSync('/home/furenku/Desktop/image-placeholder.jpg');


    const response = await keystone.executeQuery(
      `mutation initialMediaItem($name: String, $file: Upload) {
            createMediaItem(data: {name: $name, file: $file}) {
              id
            }
          }`,
      {
        variables: {
          name,
          file,
        },
      }
    );

    console.log("response:",file,response);
  }
}

module.exports = createMediaItems

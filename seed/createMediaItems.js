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


    const archivos = [
      {
        nombre: "Archivo 1",
        archivo: "test-1.jpg",
      },
      {
        nombre: "Archivo 2",
        archivo: "test-2.jpg",
      },
      {
        nombre: "Archivo 3",
        archivo: "test-3.jpg",
      },
      {
        nombre: "Archivo 4",
        archivo: "test-4.jpg",
      },
    ]

    

    archivos.forEach(async a=>{
      
      const name = a.nombre;
      const filename = a.archivo;
      
      const fileType = filename.split('.')[1]
      const encodingRead = "utf8"
      const encoding = "7bit"
      const mimetype = fileType == 'png' ? 'image/png' : 'image/jpeg'
      const fileRead = await fs.readFileSync(filename)
      const buffer = Buffer(fileRead)
  
      const file = { createReadStream: () => bufferToStream(buffer), filename, mimetype, encoding }
      // const file = await fs.readFileSync('/home/furenku/Desktop/image-placeholder.jpg');
  
      const content = {
        create: {
          document: "{\"object\":\"document\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"heading\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"text\":\"asdasd\",\"marks\":[]}]},{\"object\":\"block\",\"type\":\"blockquote\",\"data\":{},\"nodes\":[{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"text\":\"ASdasdasd\",\"marks\":[]}]}]},{\"object\":\"block\",\"type\":\"paragraph\",\"data\":{},\"nodes\":[{\"object\":\"text\",\"text\":\"\",\"marks\":[]}]}]}"
        }
      }
      
      await keystone.executeQuery(
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
  
    })


  }
}

module.exports = createMediaItems

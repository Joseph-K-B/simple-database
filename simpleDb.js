import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(store){
    this.store = store;
    // const newFile = `${this.fileId}.json`;
  }

  getPath(id) {
    return `${this.store}/${id}.json`;
  }
  
  save(obj) {
    obj.id = shortid.generate();
    // obj.id = this.fileId;
    const data = `${obj.id}.json`;
    this.file = path.join(this.store, data);
    return writeFile(this.getPath(obj.id), JSON.stringify(obj))
      .then(() => {
        return obj.id;
      });
  }

  get(id) {
    const name = `${id}.json`;
    this.file = path.join(this.store, name);
    return readFile(this.file, 'utf-8')
      .then((res) => {
        return JSON.parse(res);
      }).catch((err) => {
        if (err)  {return null;
        }
        throw err;
      });
  }
  getAll() {
    return readdir(this.store)
      .then((files) => {
        return Promise.all(
          files.map((file) => {
            console.log(files);
            return path.join(this.store, file);
          })
        ).then ((obj) => {
          return Promise.all(
            obj.map((fileId) => {
              return readFile(obj, 'utf-8')
                .then((res) => { 
                  return JSON.parse(res);
                });
            })
          );
        });      
      }); 
  }
}

// .catch((err) => {
//   if (err)  {return null;
//   }
//   throw err;
// });
//   getAll() {
//     const src = './store';
//     return readdir(src)
//       .then((files) => {
//         return Promise.all(
//           files.map((file) => {
//             return path.join(src, file);
//           })
//         )
//           .then((target) => {
//             return Promise.all(
//               target.map(x => {
//                 return readFile(x, 'utf-8')
//                   .then(parseFile => JSON.parse(parseFile));
//               })
//             );
//           });
//       });
//   }
// }




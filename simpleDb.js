import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(store){
    this.store = store;
  }

  getPath(id) {
    return `${this.store}/${id}.json`;
  }
  
  save(obj) {
    obj.id = shortid.generate();
    const getPath = this.getPath(obj.id);
    return writeFile(getPath, JSON.stringify(obj))
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
            // console.log(files);
            return path.join(this.store, file);
          })
        ).then ((obj) => {
          return Promise.all(
            obj.map((fileId) => {
              return readFile(fileId, 'utf-8')
                .then((res) => { 
                  return JSON.parse(res);
                });
            })
          );
        });      
      }); 
  }
}



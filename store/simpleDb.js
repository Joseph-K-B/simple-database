import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(rootDir){
    this.fileId = shortid.generate();
    this.rootDir = rootDir;
    // const newFile = `${this.fileId}.json`;
  }
  
  save(obj) {
    obj.id = this.fileId;
    const data = `File-${obj.id}.json`;
    this.file = path.join(this.rootDir, data);
    return writeFile(this.file, JSON.stringify(obj));
  }

  get(id) {
    const name = `File-${id}.json`;
    this.file = path.join(this.rootDir, name);
    return readFile(this.file, 'utf-8')
      .then((res) => {
        return JSON.parse(res);
      }).catch((err) => {
        if (err)  {return null;
        }
        throw err;
      });
  }
}


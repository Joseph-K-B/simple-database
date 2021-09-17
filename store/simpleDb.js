import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(rootDir){
    const newFile = `${this.fileId}.json`;
    this.fileId = shortid.generate();
    this.file = path.join(rootDir, newFile);
  }

  save(obj) {
    obj.id = this.fileId;
    const data = JSON.stringify(obj);
    return writeFile(this.file, data);
   
  }
}

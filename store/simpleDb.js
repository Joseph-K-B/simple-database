import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(rootDir){
    this.fileId = shortid.generate();
    const newFile = `${this.fileId}.json`;
    this.file = path.join(rootDir, newFile);
  }

  save(obj) {
    obj.id = this.fileId;
    const data = JSON.stringify(obj);
    return writeFile(this.file, data);
  }

  get() {
    // const name = this.file;
    readFile(this.file, 'utf-8').then((res) => {
      return JSON.parse(res);
    }).catch(() => {
      return null;
    });
  }
}

import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(rootDir){
    const name = `${shortid.generate()}.txt`;
    this.newFile = path.join(rootDir, name);
  }
}

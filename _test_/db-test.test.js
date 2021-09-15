import { rm, mkdir } from 'fs/promises';
import { SimpleDatabase } from '../store/x.js';

describe('x', () => {
  const main = '../store/simpleDb.js';

  beforeEach(() => {
    return rm(main, { force: true, recursive: true }).then(() => {
      return mkdir(main, { recursive: true });
    });
  });

  it('it generates new folder in database', () => {
    const newDb = new SimpleDatabase(main);
    
    return newDb;
  });
});

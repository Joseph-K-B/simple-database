import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../store/simpleDb.js';

describe('SimpleDb', () => {
  const rootDir = '../store/simpleDb.js';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('it checks new object for id', () => {
    const file = new SimpleDb(rootDir);
    const Martin = {
      instrument: 'guitar',
      type: 'acoustic',
    };
    
    return file
      .save(Martin)
      .then(() => {
        expect(Martin.id).toEqual(expect.any(String));
      });
  });

  it('it saves new object and gets it from database', () => {
    const file = new SimpleDb(rootDir);  
    const Martin = {
      instrument: 'guitar',
      type: 'acoustic',
      
    };
    return file
      .save(Martin)
      .then(() => { 
        return file.get(Martin.id);
      })
      .then((newFile) => {
        expect(newFile.id).toEqual(Martin.id);
      });
  });
});


        
      


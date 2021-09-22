import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../simpleDb.js';

describe('SimpleDb', () => {
  const store = './store';
  
  beforeEach(() => {
    return rm(store, { recursive: true, force: true }).then(() => {
      return mkdir(store);
    });
  });

  it('it checks new object for id', () => {
    const file = new SimpleDb(store);
    const Martin = { instrument: 'guitar' };
    
    return file
      .save(Martin)
      .then(() => {
        expect(Martin.id).toEqual(expect.any(String));
      });
  });

  it('it saves new object and gets it from database', () => {
    const file = new SimpleDb(store);  
    const Taylor = { instrument: 'guitar' };
    return file
      .save(Taylor)
      .then(() => { 
        return file.get(Taylor.id);
      })
      .then((newFile) => {
        expect(newFile.id).toEqual(Taylor.id);
      });
  });
  
  it('returns null when id isnt present', () => {
    const Yamaha = new SimpleDb(store);

    return Yamaha
      .get(867)
      .then((ghost) => {
        expect(ghost).toBe(null);
      });
  });

  it('returns objects from directory', async () => {
    // const main = './store';
    const files = new SimpleDb(store);
    const Taylor = { instrument: 'guitar' };
    const Yamaha = { instrument: 'piano' };
    const testArr = [Taylor, Yamaha];
    await Promise.all(
      testArr.map((testMap) => {
        return files.save(testMap);
      })
    );
    return files.getAll().then((pulledFiles) => {
      expect(pulledFiles).toEqual(expect.arrayContaining([Taylor, Yamaha]));
    });
  });
});
  
      


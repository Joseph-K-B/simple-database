// import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../simpleDb.js';

describe('SimpleDb', () => {
  const store = './store';
  
  // beforeEach(() => {
  //   return rm(store, { recursive: true, force: true }).then(() => {
  //     return mkdir(store, { recursive: true });
  //   });
  // });

  it('it checks new object for id', () => {
    const file = new SimpleDb(store);
    const Martin = { instrument: 'guitar' };
    
    return file
      .save(Martin)
      .then(() => {
        expect(Martin.id).toEqual(expect.any(String));
        console.log(Martin.id);
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

  it('returns objects from directory', () => {
    const main = './store';
    const files = new SimpleDb(main);
    return files.getAll()
      .then((files) => {
        expect(files).toEqual([
          { instrument: 'guitar', 
            id: expect.any(String) 
          },
          { instrument: 'guitar', 
            id: expect.any(String) 
          }
        ]);
      });
  });
});


        
      


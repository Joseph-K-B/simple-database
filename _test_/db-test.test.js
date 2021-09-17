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
    const findId = new SimpleDb(rootDir);
    const Martin = {
      instrument: 'guitar',
      type: 'acoustic',
    };
    
    return findId.save(Martin).then(() => {
      expect(Martin.id).toEqual(expect.any(String));
    });
  });

  // it('it saves new object and gets it from database', () => {
  //   const saveObject = new SavedObject(rootDir);
  //   const getObject = new GetObject(id);
  //   const Martin = {
  //     instrument: 'guitar',
  //     type: 'acoustic',
  //   };
  //   return saveObject
  //     .save(Martin)
  //     .then(() => {
  //       return getObject.get();
  //     })
  //     .then((res) => {
  //       expect(res).toEqual(Martin);
  //     });
  // });
});


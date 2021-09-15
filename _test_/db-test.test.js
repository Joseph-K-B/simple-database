import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../store/simpleDb.js';

describe('x', () => {
  const rootDir = '../store/simpleDb';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('it checks saved object for id', () => {
    const findId = new findId(rootDir);
    const Martin = {
      instrument: 'guitar',
      type: 'acoustic',
    };
    
    return findId.save(Martin).then(() => {
      expect(Martin.id).toEqual(expect.any(String));
    });
  });
});

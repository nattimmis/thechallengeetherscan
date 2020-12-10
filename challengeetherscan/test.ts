import { testWatch } from './test-Case';
import { expect } from 'chai';
import 'mocha';

describe('First test', 
  async() => { 
    it('should return true', async () => { 
      const result = await testWatch();
      expect(result).to.equal(true); 
  }); 
});   
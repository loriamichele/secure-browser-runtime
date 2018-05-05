// Execute the code
import '../src';

// Then start with tests
import list from '../src/propertyList';

describe('Security checks', () => {
  describe('Prevent native extensions', () => {
    it('should throw an error when trying to set a property with =', () => {
      list.forEach(map => {
        try {
          map.obj[map.property] = 'foo';
        } catch (e) {
          expect(e).to.be.an.instanceOf(TypeError);
        }
        expect(map.obj[map.property]).not.to.equal('foo');
      });
    });
    it('should throw an error when trying to delete a property', () => {
      list.forEach(map => {
        let initialValue = map.obj[map.property];
        try {
          delete map.obj[map.property];
        } catch (e) {
          expect(e).to.be.an.instanceOf(TypeError);
        }
        expect(map.obj[map.property]).to.equal(initialValue);
      });
    });
    it('should throw an error when trying to redefine a property', () => {
      list.forEach(map => {
        try {
          Object.defineProperty(map.obj, map.property, {
            value: 'foo',
          });
        } catch (e) {
          expect(e).to.be.an.instanceOf(TypeError);
        }
        expect(map.obj[map.property]).not.to.equal('foo');
      });
    });
  });
});

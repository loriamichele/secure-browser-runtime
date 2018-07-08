// Execute the code
import '../src';

// Then start with tests
import list from '../src/propertyList';

describe('Security checks', () => {
  describe('Prevent native extensions', () => {
    it('should throw an error when trying to set a property with =', () => {
      try {
        window.addEventListener = 'foo';
      } catch (e) {
        expect(e).to.be.an.instanceOf(TypeError);
      }
      expect(window.addEventListener).not.to.equal('foo');
    });
    it('should throw an error when trying to delete a property', () => {
      let initialValue = window.dispatchEvent;
      try {
        delete window.dispatchEvent;
      } catch (e) {
        expect(e).to.be.an.instanceOf(TypeError);
      }
      expect(window.dispatchEvent).to.equal(initialValue);
    });
    it('should throw an error when trying to redefine a property', () => {
      try {
        Object.defineProperty(document, 'getElementById', {
          value: 'foo',
        });
      } catch (e) {
        expect(e).to.be.an.instanceOf(TypeError);
      }
      expect(document.getElementById).not.to.equal('foo');
    });
  });
});

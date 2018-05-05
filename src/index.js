import propsToRestoreMapList from './propertyList';

function lockProperty({obj, property}) {
  const secureProperty = Object.freeze(obj[property]);
  delete obj[property];
  Object.defineProperty(obj, property, {
    value: secureProperty,
    writeable: false,
  });
}

propsToRestoreMapList.map(propToRestoreMap => lockProperty(propToRestoreMap));

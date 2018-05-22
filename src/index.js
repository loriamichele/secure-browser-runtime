import propsToRestoreMapList from './propertyList';

function lockProperty({obj, property}) {
  const propertyReference = obj[property];
  delete obj[property];
  Object.defineProperty(obj, property, {
    value: propertyReference,
    writeable: false,
  });
}

propsToRestoreMapList.map(propToRestoreMap => lockProperty(propToRestoreMap));

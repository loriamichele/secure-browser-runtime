const propsToRestoreMapList = [
  {obj: window, property: 'addEventListener'},
  {obj: window, property: 'alert'},
  {obj: window, property: 'atob'},
  {obj: window, property: 'blur'},
  {obj: window, property: 'btoa'},
  {obj: window, property: 'clearInterval'},
  {obj: window, property: 'clearTimeout'},
  {obj: window, property: 'close'},
  {obj: window, property: 'confirm'},
  {obj: window, property: 'focus'},
  {obj: window, property: 'getComputedStyle'},
  {obj: window, property: 'getSelection'},
  {obj: window, property: 'matchMedia'},
  {obj: window, property: 'moveBy'},
  {obj: window, property: 'moveTo'},
  {obj: window, property: 'open'},
  {obj: window, property: 'print'},
  {obj: window, property: 'prompt'},
  {obj: window, property: 'removeEventListener'},
  {obj: window, property: 'resizeBy'},
  {obj: window, property: 'resizeTo'},
  {obj: window, property: 'scrollBy'},
  {obj: window, property: 'scrollTo'},
  {obj: window, property: 'setInterval'},
  {obj: window, property: 'setTimeout'},
  {obj: window, property: 'stop'},
];

function lockProperty({obj, property}) {
  const secureProperty = Object.freeze(obj[property]);
  delete obj[property];
  Object.defineProperty(obj, property, {
    value: secureProperty,
    writeable: false,
  });
}

propsToRestoreMapList.map(propToRestoreMap => lockProperty(propToRestoreMap));

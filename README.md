Secure Browser Runtime
======================
[![npm version](https://badge.fury.io/js/secure-browser-runtime.svg)](https://badge.fury.io/js/secure-browser-runtime)
[![Build Status](https://travis-ci.org/loriamichele/secure-browser-runtime.svg?branch=master)](https://travis-ci.org/loriamichele/secure-browser-runtime)

This (_blazing fast, **1KB** gzipped_) library aims to provide a simple
way to prevent the rewriting or overriding of several fundamental browser APIs
that you need to work with on a daily basis, saving you from suffering
unpleasant headaches while trying to debug something you didn't write, and
happens to be done by an external source.

## Installing

Using npm:

```sh
npm install secure-browser-runtime
```

Using yarn:

```js
yarn add secure-browser-runtime
```

Using CDN:

```html
<script src="https://unpkg.com/secure-browser-runtime/dist/main.js"></script>
```

## Supported browsers

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## Usage

You can load the code through the import spec, it will be automatically executed.

```js
import 'secure-browser-runtime';
```

Also, you can still use the `require` function:

```js
require('secure-browser-runtime');
```

**Important note:** This must be placed at the very beginning of your application
_(e.g. main entrypoint for ES5+, first script in the DOM for pure HTML):_

## What happens when I load this in the browser?

> _With Great Power Comes Great Responsibility._

Have you ever stumbled upon code like this?

```js
window.addEventListener('load', function(e) {
  console.log('Document is ready!');
  // Do some magic...
});
```

Everything seems to be ok, huh?

Well, it actually _may be a possibility that the above code will not behave as
expected_.

Imagine some third-party JS script included in your page that contains something
like this:

```js
window.addEventListener = function(eventName, callback, ...others) {
  // Do something very evil
}
```

At this point, everything would depend on how the third-party script developed
the new function which is assigned to that property.

To prevent this, we just wrap the properties we don't want to be overwritten,
by using the `Object.defineProperty` and `Object.freeze` methods like this:

```js
// We initially store the frozen value into a constant
const secureProperty = Object.freeze(window.addEventListener);
// Then we delete the reference to the previous value
delete window.addEventListener;
// So that we can redefine it, also setting the `writeable` option to false
Object.defineProperty(window, 'addEventListener', {
  value: secureProperty,
  writeable: false,
});
```

Once this code is executed, every other attempt to overwrite that method will
not work and the initial value will be kept instead.

> Tip: this will likely help you too (_just in case you're thinking to do stuff
like this and break other people's functionalities_) by throwing an error when
trying to set values through the `=` operator or the `Object.defineProperty()`
method, and also when trying to use the `delete` keyword.

---

Here's the full list of properties that will be enclosed in a non-writable
extension of their initial value:

| Parent object |  Property name        | Parent object  |  Property name           |
|:-------------:|:---------------------:|:--------------:|:------------------------:|
| **`window`**  | `addEventListener`    | **`document`** | `addEventListener`       |
| **`window`**  | `alert`               | **`document`** | `adoptNode`              |
| **`window`**  | `atob`                | **`document`** | `close`                  |
| **`window`**  | `blur`                | **`document`** | `createAttribute`        |
| **`window`**  | `btoa`                | **`document`** | `createComment`          |
| **`window`**  | `clearInterval`       | **`document`** | `createDocumentFragment` |
| **`window`**  | `clearTimeout`        | **`document`** | `createElement`          |
| **`window`**  | `close`               | **`document`** | `createEvent`            |
| **`window`**  | `confirm`             | **`document`** | `createTextNode`         |
| **`window`**  | `focus`               | **`document`** | `execCommand`            |
| **`window`**  | `getComputedStyle`    | **`document`** | `getElementById`         |
| **`window`**  | `getSelection`        | **`document`** | `getElementsByClassName` |
| **`window`**  | `matchMedia`          | **`document`** | `getElementsByName`      |
| **`window`**  | `moveBy`              | **`document`** | `getElementsByTagName`   |
| **`window`**  | `moveTo`              | **`document`** | `hasFocus`               |
| **`window`**  | `open`                | **`document`** | `importNode`             |
| **`window`**  | `print`               | **`document`** | `normalize`              |
| **`window`**  | `prompt`              | **`document`** | `normalizeDocument`      |
| **`window`**  | `removeEventListener` | **`document`** | `open`                   |
| **`window`**  | `resizeBy`            | **`document`** | `querySelector`          |
| **`window`**  | `resizeTo`            | **`document`** | `querySelectorAll`       |
| **`window`**  | `scroll`              | **`document`** | `removeEventListener`    |
| **`window`**  | `scrollBy`            | **`document`** | `renameNode`             |
| **`window`**  | `scrollTo`            | **`document`** | `write`                  |
| **`window`**  | `setInterval`         | **`document`** | `writeln`                |
| **`window`**  | `setTimeout`          |
| **`window`**  | `stop`                |

## Contributing

Feel free to contribute adding elements to the list, if you think they should
be protected, or maybe improve the structure and efficiency of the algorithm!
Why not? Everything is welcome in the Open Source world :)

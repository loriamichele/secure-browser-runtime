Secure Browser Runtime
======================

This project aims to provide a simple way to prevent the rewriting or overriding
of several fundamental browser APIs that you need to work with on a daily basis,
saving you from suffering unpleasant headaches while trying to debug something
you didn't write, and happens to be done by an external source.

## Usage

You can load the code through ES6 import spec, it will be automatically executed.

```js
import 'secure-browser-runtime';
```

Also, you can still use the ES5 require function:

```js
require('secure-browser-runtime');
```

And, of course, the old fashioned script tag:

```html
<script type="text/javascript" src="path/to/secure-browser-runtime.js"></script>
```

**Important note:** This must be placed at the very beginning of your application
_(e.g. main entrypoint for ES5+, first script in the DOM if pure HTML):_

## What happens when I load this in the browser?

Basically, here's the list of properties that will be enclosed in a non-writable
extension of their initial value:

| Parent object |  Property name        |
|:-------------:|:---------------------:|
| `window`      | `addEventListener`    |
| `window`      | `alert`               |
| `window`      | `atob`                |
| `window`      | `blur`                |
| `window`      | `btoa`                |
| `window`      | `clearInterval`       |
| `window`      | `clearTimeout`        |
| `window`      | `close`               |
| `window`      | `confirm`             |
| `window`      | `focus`               |
| `window`      | `getComputedStyle`    |
| `window`      | `getSelection`        |
| `window`      | `matchMedia`          |
| `window`      | `moveBy`              |
| `window`      | `moveTo`              |
| `window`      | `open`                |
| `window`      | `print`               |
| `window`      | `prompt`              |
| `window`      | `removeEventListener` |
| `window`      | `resizeBy`            |
| `window`      | `resizeTo`            |
| `window`      | `scroll`              |
| `window`      | `scrollBy`            |
| `window`      | `scrollTo`            |
| `window`      | `setInterval`         |
| `window`      | `setTimeout`          |
| `window`      | `stop`                |

Feel free to contribute adding elements to the list, if you think they should
be here!

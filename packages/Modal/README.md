# Minspa Modal

A lightweight UI modal service with bootstrap like styling.  This is a standalone component of the Minspa framework, and can be used independently, or with the framework.

About Bootstrap styling:

- This component does not depend on bootstrap - it includes a hardcoded subset of the stlyes needed to give it the bootstrap styled look.
- Modals are rendered in a shadow dom, to ensure no conflicts with any styles used in the main SPA project. The SPA project may choose to use bootstrap styling in it's entiretly, or some comletely different styling.
- Modal styles may be overriden with custom styling if desired.

**[Minspa](https://github.com/devosm1030/minspa)** is a modern lightweight UI SPA framework.

- Modular - Written as ES modules, supported by all modern browsers.
- Depencency free - No nested dependencies.
- Vanilla - Components can be cloned and used as-is, directly within your project without the need for bundling.

## Installation and Usage

### For NodeJS projects

#### Installation

In your project directory, install the dependency on the command line:

```bash
npm install --save @minspa/modal
```

#### Usage

Import the package in your code:

```javascript
import { modalSvc } from '@minspa/modal'
```

### For Vanila projects

#### Vanilla Installation

Clone [MinspaModal.js](https://github.com/devosm1030/minspa/blob/main/packages/Modal/MinspaModal.js) into your project.

#### Vanilla Usage

From an ES module, import the package in your code:

```javascript
import { modalSvc } from '<path/to/>MinspaModal.js'
```

## License

MIT License - See notice in source code comments.

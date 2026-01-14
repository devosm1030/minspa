# Minspa Modal

A lightweight UI modal service with bootstrap like styling.  This is a standalone component of the Minspa framework, and can be used independently, or with the framework.

About Bootstrap styling:

- This component does not depend on bootstrap - it includes a hardcoded subset of the stlyes needed to give it the bootstrap styled look.
- Modals are rendered in a shadow dom, to ensure no conflicts with any styles used in the main SPA project. The SPA project may choose to use bootstrap styling in it's entiretly, or some comletely different styling.

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

## Overview

A lightweight, dependency-free modal service for vanilla JavaScript applications for displaying informational, confirmation, and loader/busy modals.

## Key Features

- **Shadow DOM Encapsulation** - Styles are isolated and won't conflict with your app
- **Modal Queuing** - Multiple modals are automatically queued and displayed sequentially
- **Promise-based API** - Modern async/await support
- **Smart Loader** - Delays to avoid flickering, one loader for multiple async operations
- **Zero Dependencies** - Pure vanilla JavaScript

## API Reference

### `okModal(body, options)`

Display a modal with only an OK button. Returns a promise that resolves when OK is clicked.

**Parameters:**

- `body` (string) - HTML content for the modal body
- `options` (object, optional)
  - `title` (string) - Modal title (header hidden if not provided)
  - `okLabel` (string) - Custom OK button text (default: "OK")
  - `sanitizer` (function) - Function to sanitize HTML content

**Returns:**

- `Promise`
  - resolves to true
  - includesclose() method, enables closing the modal programatically without user input

**Example:**

```javascript
await modalSvc.okModal('Operation completed successfully!')

// With options
await modalSvc.okModal(
  '<p>Your changes have been saved.</p>',
  { 
    title: 'Success',
    okLabel: 'Great!',
    sanitizer: DOMPurify.sanitize
  }
)
```

### `okCancelModal(body, options)`

Display a modal with OK and Cancel buttons. Returns a promise that resolves to true/false based on user selection.

**Parameters:**

- `body` (string) - HTML content for the modal body
- `options` (object, optional)
  - `title` (string) - Modal title
  - `okLabel` (string) - Custom OK button text (default: "OK")
  - `cancelLabel` (string) - Custom Cancel button text (default: "Cancel")
  - `sanitizer` (function) - Function to sanitize HTML content

- `Promise`
  - resolves to true
  - includesclose() method, enables closing the modal programatically without user input

**Example:**

```javascript
const confirmed = await modalSvc.okCancelModal(
  'Are you sure you want to delete this item?',
  { 
    title: 'Confirm Delete',
    okLabel: 'Delete',
    cancelLabel: 'Keep'
  }
)

if (confirmed) {
  // User clicked OK/Delete
  deleteItem()
} else {
  // User clicked Cancel/Keep
  console.log('Deletion cancelled')
}
```

### `showLoader()`

Display a loading spinner modal. Returns a callback function to close the loader.

**Features:**

- **Delayed Display**: Loader only shows after 500ms to avoid flickering for fast operations
- **Reference Counting**: Multiple calls stack, loader closes when all are resolved
- **Auto-queuing**: Waits for other modals to close first

**Returns:** Function (call to close the loader)

**Example:**

```javascript
// Basic usage
const closeLoader = modalSvc.showLoader()
await fetchData()
closeLoader()

// Multiple async operations - one loader displays until all async logic done
const fetchData = async query => {
  const closeLoader = modalSvc.showLoader()
  try {
    return await dbSelect(query)
  } finally {
    closeLoader()
  }
}
const [result1, result2] = await Promise.all([fetchData(q1), fetchData(q2)])
```

## Advanced Examples

### Programmatic Modal Closing

```javascript

  const okModal = modalSvc.okModal('This is an OK-only modal!', { title: 'Information' })
 
  // auto close after 5s timer
  const { promise: timeoutPromise, resolve } = Promise.withResolvers()
  const timeoutId = setTimeout(() => { okModal.close(); resolve() }, 5000)

  // wait for 5 seconds or user input, whatever comes first
  await Promise.race([okModal, timeoutPromise]) 
  try { clearTimeout(timeoutId) } catch {} // clear timeout if user beat the timer

```

### Sequential Modals (Auto-queued)

```javascript
// These will display one after another automatically
modalSvc.okModal('Step 1 complete')
modalSvc.okModal('Step 2 complete') // won't display until first modal closed
modalSvc.okModal('All done!')
```

### Content Sanitization

```javascript
import DOMPurify from 'dompurify'

const userInput = '<img src=x onerror=alert(1)>'

// Sanitize untrusted content
await modalSvc.okModal(userInput, {
  title: 'User Message',
  sanitizer: DOMPurify.sanitize
})
```

## License

MIT License - See notice in source code comments.

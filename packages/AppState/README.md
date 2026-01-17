# Minspa Appstate

A lightweight, flexible state management library for JavaScript applications with built-in persistence support using browser sessionStorage.  This is a standalone component of the Minspa framework, and can be used independently, or with the framework.

**[Minspa](https://github.com/devosm1030/minspa)** is a modern lightweight UI SPA framework.

- Modular - Written as ES modules, supported by all modern browsers.
- Depencency free - No nested dependencies.
- Vanilla - Components can be cloned and used as-is, directly within your project without the need for bundling.

## Table of Contents

- [Overview](#overview)
- [Installation and Usage](#installation-and-usage)
- [API Reference](#api-reference)
  - [Default state service: `appstate`](#default-state-service-appstate)
  - [`appstateFor(stateId)`](#appstateforstateid)
  - [`appstate.on(eventName, callback)`](#appstateoneventname-callback)
  - [`appstate.off(eventName, callback?)`](#appstateoffeventname-callback)
  - [`appstate.set(eventName, data, persist?)`](#appstateseteventname-data-persist)
  - [`appstate.get(eventName)`](#appstategeteventname)
  - [`appstate.delete(eventName, broadcast?)`](#appstatedeleteeventname-broadcast)
  - [`appstate.reset()`](#appstatereset)
  - [Proxy Property Access](#proxy-property-access)
- [Advanced Usage](#advanced-usage)
  - [Multiple State Instances](#multiple-state-instances)
  - [Persistence Patterns](#persistence-patterns)
  - [Cleanup and Memory Management](#cleanup-and-memory-management)
- [Browser Compatibility](#browser-compatibility)

## Overview

Appstate provides a simple yet powerful way to manage application state with a publish-subscribe pattern. It supports multiple isolated state instances, automatic persistence to sessionStorage, and proxy-based direct property access.

### Key Features

- **Event-based state management** - Subscribe to state changes with callback functions
- **Automatic persistence** - Optional sessionStorage integration when used in browser environment for tab-lifetime persistence
- **Multiple state instances** - Create isolated state contexts with unique identifiers
- **Proxy support** - Access state directly as object properties or through methods
- **Browser and Node.js compatible** - Gracefully handles environments without `window` object

## Installation and Usage

### For NodeJS projects

#### Installation

In your project directory, install the dependency on the command line:

```bash
npm install --save @minspa/appstate
```

#### Usage

Import the package in your code:

```javascript
import { appstate } from '@minspa/appstate'
```

### For Vanila projects

#### Vanilla Installation

Clone [MinspaAppstate.js](https://github.com/devosm1030/minspa/blob/main/packages/AppState/MinspaAppstate.js) into your project.

#### Vanilla Usage

From an ES module, import the package in your code:

```javascript
import { appstate } from '<path/to/>MinspaAppstate.js'
```

## API Reference

### Default state service: `appstate`

The default `appstate` instance that can be used globally in your application.

```javascript
import { appstate } from '@minspa/appstate';
```

---

### `appstateFor(stateId)`

Creates or retrieves an isolated Appstate instance with a unique identifier.  When you want to create multiple app state services within your application.

**Parameters:**

- `stateId` (string, required) - Unique identifier for the state instance

**Returns:** Appstate instance (proxied)

**Throws:** Error if `stateId` is not provided

**Example:**

```javascript
import { appstateFor } from '@minspa/appstate';

const authState = appstateFor('auth');
const uiState = appstateFor('ui');

// These states are completely isolated
authState.set('token', 'abc123');
uiState.set('sidebarOpen', true);

console.log(authState.get('token')); // 'abc123'
console.log(uiState.get('token')); // undefined
```

---

### `appstate.on(eventName, callback)`

Subscribe to state changes for a specific event.

**Parameters:**

- `eventName` (string, required) - Name of the event to subscribe to
- `callback` (function, required) - Function called when state changes. Receives the new state value as argument.

**Returns:** `undefined`

**Throws:** Error if `eventName` is not a string

**Behavior:**

- If state already exists for the event, callback is immediately called with current value
- Multiple callbacks can subscribe to the same event
- Callbacks are executed in the order they were registered
- Callbacks are executed on EVERY request to update the event, regardless of whether or not the event or it's contents have changed.

**Example:**

```javascript
// Subscribe to user changes
appstate.on('user', (userData) => {
  console.log('User changed:', userData);
});

// Subscribe multiple callbacks to same event
appstate.on('user', (userData) => {
  updateUI(userData);
});

appstate.on('user', (userData) => {
  logAnalytics('user_changed', userData);
});

// Set user - all callbacks will be triggered
appstate.set('user', { id: 1, name: 'Alice' });
```

**Immediate callback execution:**

```javascript
// Set state first
appstate.set('config', { theme: 'dark' });

// Subscribe later - callback is immediately called with current value
appstate.on('config', (config) => {
  console.log('Current config:', config); // Logs immediately
});
```

---

### `appstate.off(eventName, callback?)`

Unsubscribe from state changes.

**Parameters:**

- `eventName` (string, required) - Name of the event to unsubscribe from
- `callback` (function, optional) - Specific callback to remove. If omitted, all callbacks for the event are removed.

**Returns:** `undefined`

**Throws:** Error if `eventName` is not a string

**Example:**

```javascript
const userHandler = (user) => {
  console.log('User:', user);
};

// Subscribe
appstate.on('user', userHandler);

// Unsubscribe specific callback
appstate.off('user', userHandler);

// Or remove all subscribers for an event
appstate.on('user', handler1);
appstate.on('user', handler2);
appstate.off('user'); // Removes both handler1 and handler2
```

---

### `appstate.set(eventName, data, persist?)`

Set or update state and notify subscribers.  Subscribers will be notified regardless of whether or not the data for the event has changed from it's prior value.

**Parameters:**

- `eventName` (string, required) - Name of the event/state key
- `data` (any, required) - Value to store (must be JSON-serializable if persisting)
- `persist` (boolean, optional, default: `false`) - Whether to persist to sessionStorage.  Only applicable in a browser envrionment.

**Returns:** The `data` value that was set, or `undefined` if parameters are invalid

**Throws:** Error if `eventName` is not a string

**Example:**

```javascript
// Basic usage
appstate.set('count', 42);

// With persistence (survives page refresh within same tab)
appstate.set('userPreferences', { theme: 'dark', language: 'en' }, true);

// Complex data structures
appstate.set('todos', [
  { id: 1, text: 'Learn Appstate', done: true },
  { id: 2, text: 'Build app', done: false }
]);

// Chainable pattern (returns the data)
const savedUser = appstate.set('user', { name: 'Bob' });
console.log(savedUser); // { name: 'Bob' }
```

**Persistence behavior:**

```javascript
// First time setting with persist
appstate.set('token', 'secret123', true);

// Refresh page - state is restored from sessionStorage

// Update persisted state (automatically stays persisted)
appstate.set('token', 'newSecret456'); // Still persisted!

// To stop persisting, you must delete and re-set without persist flag
appstate.delete('token');
appstate.set('token', 'nonPersisted');
```

---

### `appstate.get(eventName)`

Retrieve current state value.

**Parameters:**

- `eventName` (string, required) - Name of the event/state key

**Returns:** The stored value, or `undefined` if not found

**Throws:** Error if `eventName` is not a string

**Example:**

```javascript
appstate.set('config', { apiUrl: 'https://api.example.com' });

const config = appstate.get('config');
console.log(config.apiUrl); // 'https://api.example.com'

// Non-existent keys return undefined
const missing = appstate.get('nonExistent'); // undefined
```

---

### `appstate.delete(eventName, broadcast?)`

Remove state and optionally notify subscribers.

**Parameters:**

- `eventName` (string, required) - Name of the event/state key to delete
- `broadcast` (boolean, optional, default: `false`) - Whether to notify subscribers with `undefined`

**Returns:** `undefined`

**Example:**

```javascript
appstate.set('temp', 'temporary data');
console.log(appstate.get('temp')); // 'temporary data'

// Delete without notifying subscribers
appstate.delete('temp');
console.log(appstate.get('temp')); // undefined

// Delete with notification
appstate.on('user', (user) => {
  console.log('User is now:', user);
});

appstate.set('user', { name: 'Charlie' }); // Logs: "User is now: { name: 'Charlie' }"
appstate.delete('user', true); // Logs: "User is now: undefined"
```

---

### `appstate.reset()`

Clear all state and subscribers, returning to initial state.

**Parameters:** None

**Returns:** `undefined`

**Example:**

```javascript
appstate.set('key1', 'value1');
appstate.set('key2', 'value2', true); // persisted
appstate.on('key1', () => {});

appstate.reset();

// All state cleared
console.log(appstate.get('key1')); // undefined
console.log(appstate.get('key2')); // undefined (even persisted data is removed)

// All subscribers removed
// Subscribers will not be called
```

---

### Proxy Property Access

Appstate instances support direct property access through JavaScript Proxy.

**Example:**

```javascript
// Setting values
appstate.userName = 'Alice';
appstate.isLoggedIn = true;
appstate.settings = { theme: 'dark' };

appstate.on('userName', userName => {
  console.log(userName); // 'Alice'
})

// Getting values
console.log(appstate.userName); // 'Alice'
console.log(appstate.isLoggedIn); // true

// Equivalent to:
appstate.set('userName', 'Alice');
appstate.get('userName');

// Note: Proxy access does NOT support persistence flag
// Use explicit set() method for persistence
appstate.set('userName', 'Alice', true); // Persisted
```

---

## Advanced Usage

### Multiple State Instances

Create isolated state contexts for different parts of your application:

```javascript
import { appstateFor } from '@minspa/appstate';

const authState = appstateFor('auth');
const cartState = appstateFor('cart');
const notificationState = appstateFor('notifications');

// Each instance is completely independent
authState.set('token', 'jwt-token-here', true);
cartState.set('items', [], true);
notificationState.set('unread', 0);
```

### Persistence Patterns

```javascript
// User preferences that survive page refresh
appstate.set('preferences', {
  theme: 'dark',
  language: 'en',
  notifications: true
}, true);

// Session-only data (not persisted)
appstate.set('tempFormData', { field1: 'value' });
```

### Cleanup and Memory Management

```javascript
const handler = (data) => console.log(data);

// Subscribe
appstate.on('event', handler);

// Clean up when component unmounts
function cleanup() {
  appstate.off('event', handler);
}

// Or reset everything (useful for testing)
afterEach(() => {
  appstate.reset();
});
```

---

## Browser Compatibility

Appstate works in all modern browsers and Node.js environments:

- **Browser:** Requires sessionStorage support (IE 8+, all modern browsers)
- **Node.js:** Works without browser-specific features (persistence disabled)

---

## License

MIT License - See notice in source code comments.

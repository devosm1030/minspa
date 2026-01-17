# Minspa Framework Package

**[Minspa](https://github.com/devosm1030/minspa)** is a modern lightweight UI framework for building Single Page Applications (SPAs) with vanilla JavaScript.

This is the all-in-one framework package that bundles all Minspa components into a single dependency. Install this package to get the complete Minspa framework with one command.

- **Modular** - Written as ES modules, supported by all modern browsers
- **Dependency free** - Zero external dependencies
- **Flexible** - Use as npm packages or clone components directly into your project
- **Vanilla JavaScript** - No build tools required (but fully compatible with bundlers)
- **Lightweight** - Minimal footprint with maximum functionality

## Quick Start

### Installation

```bash
npm install @minspa/framework
```

### Usage

Import components from the framework package:

```javascript
import { Router, appstate, Navbar, modalSvc } from '@minspa/framework'
```

## What's Included

The Framework package includes all core Minspa components:

- **[@minspa/router](https://github.com/devosm1030/minspa/tree/main/packages/Router)** - Client-side routing with authentication and lifecycle management
- **[@minspa/appstate](https://github.com/devosm1030/minspa/tree/main/packages/AppState)** - Reactive state management with persistence
- **[@minspa/navbar](https://github.com/devosm1030/minspa/tree/main/packages/Navbar)** - Responsive navigation component with Shadow DOM
- **[@minspa/modal](https://github.com/devosm1030/minspa/tree/main/packages/Modal)** - Modal dialogs with promise-based API

## Why Use This Package?

### Advantages

- **Single Dependency** - Install all Minspa components with one command
- **Consistent Versioning** - All components are version-matched for compatibility
- **Simpler Imports** - Import everything from one package
- **Zero External Dependencies** - No nested dependencies to manage

### When to Use

✅ **Use the Framework package when:**

- You're using **multiple Minspa components** in your project
- You prefer the **convenience of a single dependency**
- You're already using **Node.js and npm** in your workflow
- You want **consistent versioning** across all components

### Alternatives

**Individual Packages** - Install only what you need:

```bash
npm install @minspa/router @minspa/appstate
```

```javascript
import { Router } from '@minspa/router'
import { appstate } from '@minspa/appstate'
```

Use individual packages when you only need one or two components or want fine-grained control over component versions.

**Vanilla Files** - Clone component files directly into your project:

```javascript
import { Router } from './lib/MinspaRouter.js'
import { appstate } from './lib/MinspaAppstate.js'
```

Use vanilla files when you want to avoid Node.js/npm entirely, prefer to directly customize source files, or want maximum control and transparency.

## Component Overview

### Router

Client-side routing for single-page applications with authentication and lifecycle management.

**Key Features:**

- Route registration and navigation
- Authentication and authorization hooks
- Lifecycle hooks (mount/unmount)
- Browser history integration
- Navigation listeners

[View full Router documentation →](https://github.com/devosm1030/minspa/tree/main/packages/Router)

### Appstate

Reactive state management with built-in sessionStorage persistence.

**Key Features:**

- Event-based state management (pub-sub pattern)
- Automatic sessionStorage persistence
- Multiple isolated state instances
- Proxy-based property access
- Browser and Node.js compatible

[View full Appstate documentation →](https://github.com/devosm1030/minspa/tree/main/packages/AppState)

### Navbar

Responsive navigation bar component with Bootstrap-like styling.

**Key Features:**

- Bootstrap-style appearance (no Bootstrap dependency)
- Shadow DOM style encapsulation
- Responsive mobile design with collapsible menu
- Active state management
- User display support
- Customizable styling

[View full Navbar documentation →](https://github.com/devosm1030/minspa/tree/main/packages/Navbar)

### Modal

Modal service for displaying dialogs with Bootstrap-like styling.

**Key Features:**

- Shadow DOM encapsulation
- Modal queuing (automatic sequential display)
- Promise-based API (async/await support)
- Smart loader with flicker prevention
- Multiple modal types (info, confirmation, loader)

[View full Modal documentation →](https://github.com/devosm1030/minspa/tree/main/packages/Modal)

## Examples

The [Minspa repository](https://github.com/devosm1030/minspa) includes complete working examples:

### [Basic Navigation Example](https://github.com/devosm1030/minspa/tree/main/examples/basicNavigation)

A simple SPA demonstrating routing and navigation without authentication.

**Demonstrates:**

- Basic routing setup
- Navbar integration
- Page navigation
- Vanilla JavaScript usage (no build tools)

### [Full SPA with Authentication Example](https://github.com/devosm1030/minspa/tree/main/examples/fullSPAWithAuth)

A complete SPA with authentication, authorization, and role-based access control.

**Demonstrates:**

- User authentication flows
- Protected routes
- Role-based page access
- State management with persistence
- Modal dialogs
- Session handling

Both examples can be run directly in a web browser without any build step.

## Full Documentation

For comprehensive documentation including:

- What Minspa is and its design philosophy
- Detailed component capabilities and use cases
- When to use (or not use) Minspa
- API references and examples
- Contributing guidelines

Please see the [main Minspa documentation](https://github.com/devosm1030/minspa).

## License

MIT License - see [LICENSE](https://github.com/devosm1030/minspa/blob/main/LICENSE) file for details

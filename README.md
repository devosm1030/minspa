# Minspa Framework

**[Minspa](https://github.com/devosm1030/minspa)** is a modern lightweight UI framework for building Single Page Applications (SPAs) with vanilla JavaScript.

- **Modular** - Written as ES modules, supported by all modern browsers
- **Dependency free** - Zero external dependencies
- **Flexible** - Use as npm packages or clone components directly into your project
- **Vanilla JavaScript** - No build tools required (but fully compatible with bundlers)
- **Lightweight** - Minimal footprint with maximum functionality

## Table of Contents

- [Overview](#overview)
- [What is Minspa?](#what-is-minspa)
- [Core Packages](#core-packages)
- [Installation and Usage](#installation-and-usage)
- [Component Details](#component-details)
- [What Minspa is Good For](#what-minspa-is-good-for)
- [What Minspa is Not Good For](#what-minspa-is-not-good-for)
- [Examples](#examples)
- [Philosophy](#philosophy)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

Minspa is a collection of standalone JavaScript components designed to work together as a cohesive framework for building SPAs. Each component can be used independently or combined to create a complete application framework. With zero external dependencies and modern ES module support, Minspa gives you the power to build sophisticated web applications while keeping your bundle size minimal and your dependencies under control.

## What is Minspa?

Minspa (Mini SPA) is a lightweight alternative to heavy frameworks like React, Angular, or Vue. It provides the essential building blocks for modern single-page applications without the complexity, build tooling requirements, or large bundle sizes typical of traditional frameworks.

Think of Minspa as a "framework toolkit" - you get:

- A powerful client-side router with authentication hooks
- Reactive state management with persistence
- UI components (navbar, modals) with Shadow DOM encapsulation
- The freedom to use as much or as little as you need

### Key Design Principles

1. **No Dependencies** - Minspa has zero external dependencies, giving you full control over your dependency tree
2. **True Modularity** - Each component is independent and can be used standalone or together
3. **Vanilla JavaScript** - Pure ES6+ JavaScript that works directly in modern browsers
4. **Flexible Usage** - Install via npm, or simply clone the source files into your project
5. **Build Optional** - Use directly in the browser or with your preferred bundler
6. **Small Footprint** - Minimal code means faster load times and easier maintenance

## Core Packages

Minspa is a collection of standalone JavaScript components that can be used independently or together as a complete framework. Each component is available as an individual npm package, or you can install the all-in-one framework package.

### [@minspa/framework](./packages/Framework/)

An all-in-one package that bundles all Minspa components together. Install this if you want the complete framework with a single dependency.

```bash
npm install @minspa/framework
```

```javascript
import { Router, appstate, Navbar, modalSvc } from '@minspa/framework'
```

This is the recommended approach for most projects using multiple Minspa components, as it provides:

- **Single Dependency** - Install all Minspa components with one command
- **Consistent Versioning** - All components are version-matched for compatibility
- **Simpler Imports** - Import all components from one package
- **Zero External Dependencies** - While this requires Node.js for package management, the framework itself still has zero external dependencies

### [@minspa/router](./packages/Router/)

A lightweight client-side router for handling navigation, route registration, authentication, and lifecycle management.

**Package:** `@minspa/router`

**Key Features:**

- Route registration with path-based navigation
- Authentication and authorization hooks
- Browser history integration
- Navigation lifecycle hooks (onRendered, onUnmount)
- Navigation change listeners

**Use cases:**

- Client-side routing in SPAs
- Protected routes with authentication
- Page lifecycle management
- Integration with navigation components

[View full documentation →](./packages/Router/README.md)

### [@minspa/appstate](./packages/AppState/)

Reactive state management with built-in sessionStorage persistence support.

**Package:** `@minspa/appstate`

**Key Features:**

- Event-based publish-subscribe pattern
- Automatic persistence to sessionStorage
- Multiple isolated state instances
- Proxy-based property access
- Browser and Node.js compatible

**Use cases:**

- Application state management
- User session data
- Cross-component communication
- Persisting state across page refreshes

[View full documentation →](./packages/AppState/README.md)

### [@minspa/navbar](./packages/Navbar/)

A responsive navigation bar component with Bootstrap-like styling and Shadow DOM encapsulation.

**Package:** `@minspa/navbar`

**Key Features:**

- Bootstrap-style appearance (no Bootstrap dependency)
- Shadow DOM for style isolation
- Mobile-responsive with collapsible menu
- Active page highlighting
- Conditional visibility per route
- Optional user display

**Use cases:**

- Application navigation
- Page-level menus
- User identification display
- Responsive mobile navigation

[View full documentation →](./packages/Navbar/README.md)

### [@minspa/modal](./packages/Modal/)

A lightweight modal service for displaying dialogs with Bootstrap-like styling.

**Package:** `@minspa/modal`

**Key Features:**

- Shadow DOM style encapsulation
- Promise-based API (async/await support)
- Modal queuing for sequential display
- OK, confirmation, and loader modals
- Smart loader with delay to prevent flicker
- Multiple simultaneous async operation support

**Use cases:**

- User confirmations
- Information messages
- Loading indicators
- Form dialogs

[View full documentation →](./packages/Modal/README.md)

## Installation and Usage

Minspa offers three flexible installation approaches to fit your project needs:

### Option 1: NPM Framework Package (Recommended for most projects)

Install all components with one command:

```bash
npm install @minspa/framework
```

**Usage:**

```javascript
import { Router, appstate, Navbar, modalSvc } from '@minspa/framework'
```

**When to use:**

- You're using **multiple Minspa components** in your project
- You prefer the **convenience of a single dependency**
- You're already using **Node.js and npm** in your workflow
- You want **consistent versioning** across all components

### Option 2: Individual NPM Packages

Install only what you need:

```bash
npm install @minspa/router @minspa/appstate
```

**Usage:**

```javascript
import { Router } from '@minspa/router'
import { appstate } from '@minspa/appstate'
```

**When to use:**

- You only need **one or two components** from Minspa
- You want **fine-grained control** over component versions

### Option 3: Vanilla (No Build Tools Required)

Clone component files directly into your project and import them:

```javascript
import { Router } from './lib/MinspaRouter.js'
import { appstate } from './lib/MinspaAppstate.js'
```

**Benefits:**

- No Node.js or npm required
- No build step or bundler needed
- Direct browser ES module imports
- Full control over source code
- Zero abstraction - see exactly what you're running

**When to use:**

- You want to avoid Node.js/npm entirely
- You prefer to directly copy and customize component source files
- You're working on a simple project without a build system
- You want maximum control and transparency

### Import Comparison

Here's how imports differ across the three approaches:

**Using the Framework package:**

```javascript
// Single import for all components
import { Router, appstate, appstateFor, Navbar, modalSvc } from '@minspa/framework'
```

**Using individual packages:**

```javascript
// Separate imports for each component
import { Router } from '@minspa/router'
import { appstate, appstateFor } from '@minspa/appstate'
import { Navbar } from '@minspa/navbar'
import { modalSvc } from '@minspa/modal'
```

**Using vanilla (no Node.js required):**

```javascript
// Import from locally cloned files
import { Router } from './lib/MinspaRouter.js'
import { appstate, appstateFor } from './lib/MinspaAppstate.js'
import { Navbar } from './lib/MinspaNavbar.js'
import { modalSvc } from './lib/MinspaModal.js'
```

## Component Details

Each Minspa component is designed to be fully functional as a standalone module while also working seamlessly with other Minspa components. Below is a more detailed look at each component's capabilities.

### Router

The Router component provides sophisticated client-side routing with authentication and authorization support.

**Key Capabilities:**

- **Route Registration and Navigation** - Register routes with path patterns and handlers. Navigate between pages programmatically or via HTML links
- **Authentication Hooks** - Built-in support for authentication checks before rendering protected routes
- **Authorization** - Role-based access control with customizable authorization logic
- **Lifecycle Hooks** - Execute code when pages mount (onRendered) and unmount (onUnmount)
- **History Integration** - Seamlessly integrates with the browser's History API for back/forward navigation
- **Navigation Listeners** - Subscribe to navigation events for cross-component coordination

### Appstate

A lightweight state management solution using an event-driven pub-sub pattern with optional persistence.

**Key Capabilities:**

- **Event-Based Updates** - Subscribe to state changes with custom event handlers
- **Automatic Persistence** - Optionally persist state to sessionStorage with automatic serialization
- **Multiple Instances** - Create isolated state instances for different parts of your application
- **Proxy Access** - Access and modify state properties directly through a proxy interface
- **Cross-Environment** - Works in both browser and Node.js environments

### Navbar

A fully-featured responsive navigation component with mobile support.

**Key Capabilities:**

- **Shadow DOM Encapsulation** - Styles are completely isolated from your application's CSS
- **Bootstrap-Style Design** - Professional appearance without requiring Bootstrap
- **Mobile-Responsive** - Automatically collapses to a hamburger menu on mobile devices
- **Active State** - Automatically highlights the current page
- **Route Visibility** - Control which routes show the navbar and which don't
- **User Display** - Optional user information display with customizable formatting

### Modal

A modal service for displaying dialogs without requiring manual DOM manipulation.

**Key Capabilities:**

- **Promise-Based API** - Use async/await for clean, readable code when waiting for user responses
- **Automatic Queuing** - Display multiple modals sequentially without manual queue management
- **Modal Types** - Pre-built OK, confirmation, and loader/busy modal types
- **Smart Loader** - Loader modals with built-in delay to prevent flickering on fast operations
- **Multiple Loaders** - Coordinate multiple simultaneous async operations with loader tracking
- **Shadow DOM** - Fully encapsulated styles that won't conflict with your application

## What Minspa is Good For

Minspa excels in scenarios where you want:

### ✅ Lightweight SPAs

- Small to medium-sized applications where bundle size matters
- Projects that don't need the complexity of React/Angular/Vue
- Projects with simple UI requirements where performance optimizations are not necessary.

### ✅ Build-Tool-Free Development

- Prototypes and demos that need to run directly in the browser
- Situations where you can't or don't want to use Node.js/npm
- Quick experiments without scaffolding overhead or complex setup requirements

### ✅ Full Control

- Projects where you want zero dependencies
- Applications where you want to understand and potentially modify every line of framework code
- When you want complete transparency in your stack

### ✅ Vanilla JavaScript Projects

- Teams that prefer native JavaScript over framework abstractions
- Applications that are intended to be completely Vanilla JavaScript

## What Minspa is Not Good For

Minspa may not be the best choice when you need:

### ❌ Large-Scale Enterprise Applications

- Very complex applications with hundreds of routes and components
- Projects requiring extensive component ecosystems
- Applications needing advanced optimization like code splitting, lazy loading, and tree shaking
- Teams that benefit from opinionated architectural patterns

**Consider instead:** React, Angular, Vue - these frameworks provide more comprehensive solutions for large applications

### ❌ Rich Component Libraries

- Applications requiring extensive pre-built UI components
- Projects needing Material Design, Ant Design, or similar component suites
- When you need form libraries, data grids, charts, etc, that are not available for Vanilla Javascript applications.

**Consider instead:** React with Material-UI, Angular Material, Vue with Vuetify

### ❌ Advanced Data Binding and Reactivity

- Complex two-way data binding scenarios
- Automatic DOM updates based on state changes (Virtual DOM)
- Fine-grained reactivity systems

**Consider instead:** Vue, Svelte, SolidJS

### ❌ Legacy Browser Support

- Applications that must support Internet Explorer or older browsers
- Projects requiring compatibility with browsers that don't support ES6 modules
- Environments where Shadow DOM support is not available

**Why:** Minspa is built using modern web standards (ES6+ modules, Shadow DOM, Proxy objects, History API) that are only available in modern browsers (Chrome 61+, Firefox 60+, Safari 10.1+, Edge 79+)

**Consider instead:** React, Vue, or Angular with appropriate polyfills and transpilation, or use a bundler like Vite or Webpack with Babel to transpile Minspa code for older browsers

### ❌ Built-in DOM Abstraction and Safety Features

Minspa intentionally stays minimal and does not provide:

- **DOM Abstraction** - You're responsible for your own DOM manipulation and rendering logic. Minspa provides routing and state management, but page content creation is up to you using vanilla JavaScript DOM APIs
- **Advanced Optimizations** - No built-in virtual DOM diffing, automatic memoization, or performance optimizations. You control when and how the DOM updates. For simple applications this may be fine. For more complex applications with performance considerations, this may be a concern.
- **Safety Features** - No automatic XSS protection or input sanitization. However, you can easily integrate lightweight libraries like [DOMPurify](https://github.com/cure53/DOMPurify) in a Minspa project for sanitization or other focused security tools. This approach keeps Minspa minimal while giving you flexibility to add the security features your application needs

**Consider instead:** React, Vue, Angular, or Svelte - these frameworks provide comprehensive solutions with built-in security features and optimized rendering

## Examples

The repository includes complete working examples:

### [Basic Navigation Example](./examples/basicNavigation/)

A simple SPA demonstrating routing and navigation without authentication.

**Demonstrates:**

- Basic routing setup
- Navbar integration
- Page navigation
- Vanilla JavaScript usage (no build tools)

### [Full SPA with Authentication Example](./examples/fullSPAWithAuth/)

A complete SPA with authentication, authorization, and role-based access control.

**Demonstrates:**

- User authentication flows
- Protected routes
- Role-based page access
- State management with persistence
- Modal dialogs
- Session handling
- Complete vanilla JavaScript application

Both examples can be run directly in a web browser without any build step.

## Philosophy

Minspa was created with a specific philosophy in mind:

**Simplicity over Magic** - No hidden abstractions, no complex build configurations, no "magic" that obscures what's happening. You write your own DOM manipulation code using vanilla JavaScript rather than learning framework-specific templating syntax

**Standards-based** - Built on web standards (ES modules, Shadow DOM, History API) that will be supported for years to come

**Pragmatic** - Provides just enough framework to be productive without becoming opinionated about your architecture

**Flexible** - Use what you need, ignore what you don't, modify what doesn't fit

**Developer Responsibility** - Minspa provides the scaffolding (routing, state, UI components) but leaves rendering logic, optimizations, and security measures in your hands. This keeps the framework lean while giving you complete control

## Documentation

Each package has comprehensive documentation with API references and examples:

- [Framework Package](./packages/Framework/README.md) - All-in-one installation
- [Router](./packages/Router/README.md) - Client-side routing
- [AppState](./packages/AppState/README.md) - State management
- [Navbar](./packages/Navbar/README.md) - Navigation component
- [Modal](./packages/Modal/README.md) - Modal dialogs

## Contributing

Contributions are welcome! Please feel free to submit issues, fork the repository, and create pull requests.

**Important:** When submitting pull requests, please keep the core philosophy of the project in mind. Contributions must maintain Minspa's fundamental principles:

- **Modularity** - Each component should remain independent and usable standalone
- **Modern Web Standards** - Built on standards-based APIs that work in modern browsers without polyfills
- **Vanilla JavaScript** - No external dependencies or frameworks; pure JavaScript only

Pull requests that introduce unnecessary complexity, tight coupling between modules, dependencies on non-standard APIs, or external dependencies may not be accepted.

## License

MIT License - see [LICENSE](./LICENSE) file for details

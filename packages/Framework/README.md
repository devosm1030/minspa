# Minspa Framework

A convenient all-in-one package for the Minspa framework that bundles all core components into a single dependency. Install this package to get the complete Minspa framework with one command.

**[Minspa](https://github.com/devosm1030/minspa)** is a modern lightweight UI SPA framework.

- Modular - Written as ES modules, supported by all modern browsers.
- Dependency free - No nested dependencies.
- Vanilla - Components can be cloned and used as-is, directly within your project without the need for bundling.

## Table of Contents

- [Overview](#overview)
- [Installation and Usage](#installation-and-usage)
- [Included Packages](#included-packages)
  - [Router](#router)
  - [Appstate](#appstate)
  - [Navbar](#navbar)
  - [Modal](#modal)
- [When to Use This Package](#when-to-use-this-package)

## Overview

The Minspa Framework package provides a unified way to install all Minspa components as a single dependency. This is ideal for projects using multiple Minspa components and prefer the convenience of managing them together.

Each Minspa component is designed to function as a completely independent standalone component, so you can pick and choose any or all of the components you wish to use in your project. But they are also designed to function together as seamless SPA framework, and this package provides a simple way to install and use them all together as a complete framework for your SPA project.

### Key Points

- **Single Dependency** - Install all Minspa components with one command
- **Requires Node.js** - Unlike the vanilla approach of cloning individual component files, this package requires a Node.js environment with npm
- **Zero External Dependencies** - While this requires Node.js for package management, the framework itself still has zero external dependencies
- **Consistent Versioning** - All components are version-matched for compatibility

## Installation and Usage

### Installation

In your project directory, install the dependency on the command line:

```bash
npm install --save @minspa/framework
```

### Usage

Import components from the framework package in your code:

```javascript
import { Router, appstate, Navbar, modalSvc } from '@minspa/framework'
```

### Import Comparison: Framework vs Individual Packages

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

## Included Packages

The Framework package includes all core Minspa components. Below is a brief overview of each. For detailed API references and advanced usage, please refer to each component's individual README file.

### Router

**Package:** `@minspa/router`  

A lightweight, client-side router for single-page applications that handles navigation, route registration, authentication, and lifecycle management. 

**Key Features:**

- Route registration and navigation
- Authentication and authorization hooks
- Lifecycle hooks (mount/unmount)
- Browser history integration
- Navigation listeners

### Appstate

**Package:** `@minspa/appstate`  

A lightweight, flexible state management library with built-in persistence support using browser sessionStorage.

**Key Features:**

- Event-based state management (pub-sub pattern)
- Automatic sessionStorage persistence
- Multiple isolated state instances
- Proxy-based property access
- Browser and Node.js compatible

### Navbar

**Package:** `@minspa/navbar`  

A responsive navigation bar component with Bootstrap-like styling that works seamlessly in modern web applications.

**Key Features:**

- Bootstrap-style appearance (no Bootstrap dependency)
- Shadow DOM style encapsulation
- Responsive mobile design with collapsible menu
- Active state management
- User display support
- Customizable styling

### Modal

**Package:** `@minspa/modal`  

A lightweight modal service with Bootstrap-like styling for displaying informational, confirmation, and loader/busy modals.

**Key Features:**

- Shadow DOM encapsulation
- Modal queuing (automatic sequential display)
- Promise-based API (async/await support)
- Smart loader with flicker prevention
- Multiple modal types (info, confirmation, loader)

## When to Use This Package

### Use the Framework Package When

- You're using **multiple Minspa components** in your project
- You prefer the **convenience of a single dependency**
- You're already using **Node.js and npm** in your workflow
- You want **consistent versioning** across all components

### Use Individual Packages When

- You only need **one or two components** from Minspa
- You want **fine-grained control** over component versions

### Use Vanilla Files When

- You want to avoid Node.js/npm entirely
- You prefer to directly copy and customize component source files
- You're working on a simple project without a build system
- You want maximum control and transparency

---

For detailed documentation on each component's API, advanced usage patterns, and examples, please refer to the individual README files for each package.

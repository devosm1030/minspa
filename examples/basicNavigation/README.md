# Minspa Basic Navigation Example

This is a vanilla JavaScript example demonstrating the core features of the Minspa framework. It showcases client-side routing and navigation bar functionality without requiring any build tools or bundlers.

## What's Included

This example demonstrates:

- **Client-side routing** using `MinspaRouter.js`
- **Navigation bar** with `MinspaNavbar.js`
- **Page components** with simple DOM-based structure
- **ES6 module imports** directly in the browser

## Running the Example

This example can be run as-is in any web server. Simply serve the `examples/basicNavigation` directory and open `index.html` in your browser.

**Important:** Your HTTP server must be configured to handle client-side routing (React-style paths). This means all routes should serve the `index.html` file, allowing the Minspa router to handle navigation. Without this configuration, direct navigation to routes like `/page1` or `/page2` will result in 404 errors.

For example, using Python's built-in HTTP server:

```bash
cd examples/basicNavigation
python -m http.server 8000
```

Or using `serve` with SPA support:

```bash
npx serve -s
```

Then navigate to `http://localhost:8000` in your browser.

## Structure

- `index.html` - Entry point that loads the main module
- `main.js` - Application setup and initialization
- `lib/` - Local copies of Minspa Router and Navbar modules
- `pages/` - Individual page components (page1.js, page2.js)
- `style.css` - Custom styles
- `bsmini.css` - Bootstrap-inspired minimal CSS framework

## Using the Framework Packages with a Bundler

If you prefer to use the official Minspa packages with a bundler like Vite or Webpack:

1. **Install the framework packages:**

   ```bash
   npm install @minspa/router @minspa/navbar
   ```

2. **Update your imports in `main.js`:**

   ```javascript
   // Replace:
   import { Router } from './lib/MinspaRouter.js'
   import { Navbar } from './lib/MinspaNavbar.js'
   
   // With:
   import { Router } from '@minspa/router'
   import { Navbar } from '@minspa/navbar'
   ```

3. **Remove the `lib/` directory** as it will no longer be needed.

4. **Set up your bundler** (e.g., Vite, Webpack, Rollup) according to its documentation to bundle and serve your application.

5. **Update `index.html`** to reference your bundled output file instead of the module script.

The page structure and routing configuration remain the same whether using vanilla JavaScript or a bundler.

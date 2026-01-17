# Minspa Full SPA with Authentication Example

This is a vanilla JavaScript example demonstrating a complete Single Page Application (SPA) with authentication using the Minspa framework. It showcases client-side routing, navigation, state management, and role-based access control without requiring any build tools or bundlers.

## What's Included

This example demonstrates:

- **Client-side routing** using `MinspaRouter.js`
- **Navigation bar** with `MinspaNavbar.js`
- **Application state management** using `MinspaAppstate.js`
- **Modal dialogs** with `MinspaModal.js`
- **Authentication and authorization** with route protection
- **Role-based access control** with per-user page permissions
- **Session persistence** using sessionStorage
- **Page components** with simple DOM-based structure
- **ES6 module imports** directly in the browser

## User Configuration

User configuration is located in **`config.js`**. This file defines the available users and their authorized pages.

### Test Users

The following users are available for testing (any password is valid for these users):

- **user1**: Has access to `/page1`, `/page2`, `/stretchex`, and `/secretpage`
- **user2**: Has access to `/page2` only

**Note:** The authentication logic in this example is **rudimentary and for demo purposes only**. It does not include password validation, secure token management, or other security features required for production applications. Do not use this authentication pattern in real-world applications.

## Running the Example

This example can be run as-is in any web server. Simply serve the `examples/fullSPAWithAuth` directory and open `index.html` in your browser.

**Important:** Your HTTP server must be configured to handle client-side routing (React-style paths). This means all routes should serve the `index.html` file, allowing the Minspa router to handle navigation. Without this configuration, direct navigation to routes like `/page1` or `/page2` will result in 404 errors.

For example, using Python's built-in HTTP server:

```bash
cd examples/fullSPAWithAuth
python -m http.server 8000
```

Or using `serve` with SPA support:

```bash
npx serve -s
```

Then navigate to `http://localhost:8000` in your browser.

## How Authentication Works

1. **Initial Load**: The application checks for existing authentication details in sessionStorage. If none are found, the user is redirected to the `/logon` page.

2. **Login**: Users enter their userid (password is not validated in this demo). The system checks if the userid exists in `config.js` and retrieves their authorized pages.

3. **Route Protection**: The `onPathAuth` function in `main.js` intercepts all navigation attempts and:
   - Redirects unauthenticated users to `/logon`
   - Redirects unauthorized users to `/unauthorized`
   - Ensures users can only access pages they're authorized for

4. **Navigation Bar**: The navbar dynamically displays only the pages the authenticated user has access to.

5. **Session Persistence**: Authentication state is stored in sessionStorage, so users remain logged in across page refreshes.

## Structure

- `index.html` - Entry point that loads the main module
- `main.js` - Application setup, initialization, and authentication logic
- `config.js` - User configuration with role-based permissions
- `lib/` - Local copies of Minspa modules (Router, Navbar, Appstate, Modal)
- `pages/` - Individual page components
  - `logonpage.js` - Login page
  - `unauthorizedpage.js` - Unauthorized access page
  - `page1.js`, `page2.js` - Sample authenticated pages
  - `stretchEx.js` - Example stretch component
  - `secretpage.js` - Protected page for authorized users only
- `style.css` - Custom styles
- `bsmini.css` - Bootstrap-inspired minimal CSS framework

## Using the Framework Packages with a Bundler

If you prefer to use the official Minspa packages with a bundler like Vite or Webpack:

1. **Install the framework package:**

   ```bash
   npm install @minspa/framework
   ```

2. **Update your imports in `main.js`:**

   ```javascript
   // Replace:
   import { Router } from './lib/MinspaRouter.js'
   import { Navbar } from './lib/MinspaNavbar.js'
   import { appstate } from './lib/MinspaAppstate.js'
   
   // With:
   import { Router, Navbar, appstate } from '@minspa/framework'
   ```

3. **Remove the `lib/` directory** as it will no longer be needed.

4. **Set up your bundler** (e.g., Vite, Webpack, Rollup) according to its documentation to bundle and serve your application.

5. **Update `index.html`** to reference your bundled output file instead of the module script.

The page structure, routing configuration, and authentication logic remain the same whether using vanilla JavaScript or a bundler.

## Security Disclaimer

⚠️ **WARNING**: The authentication implementation in this example is for **demonstration purposes only**. It lacks essential security features including:

- No password validation
- No secure token management
- Client-side only validation (easily bypassed)
- No encryption or secure communication
- No protection against common web vulnerabilities

For production applications, implement proper server-side authentication with:

- Secure password hashing (bcrypt, Argon2, etc.)
- JWT or session tokens
- HTTPS/TLS encryption
- CSRF protection
- Rate limiting
- Proper session management
- Server-side authorization checks

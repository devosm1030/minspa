/*
  Minspa Navbar  v0.0.0 (https://github.com/devosm1030/minspa/)
  Copyright 2026 Mike DeVos
  Licensed under MIT (https://github.com/devosm1030/minspa/blob/main/LICENSE)

  A lightweight vanilla UI navigation bar service with bootstrap like styling.
*/

/*
  The following stylesheet is based on Bootstrap 5.3 Navbar styles, modified for use in Minspa.
   * Bootstrap  v5.3.8 (https://getbootstrap.com/)
   * Copyright 2011-2025 The Bootstrap Authors
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
*/
const navBarStylesheet = /* css */ `
.navbar {
  background-color: #212529;
  color: #fff;
  padding: 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

.navbar.navbar-hidden {
  display: none;
}

.navbar-container {
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
}

/* Navbar Toggle Button (for mobile) */
.navbar-toggle {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  display: none;
}

.navbar-toggle:hover {
  color: rgba(255, 255, 255, 0.75);
}

.navbar-toggle-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.55)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

/* Navbar Content */
.navbar-content {
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  align-items: center;
}

.navbar-content.collapsed {
  display: none;
}

/* Navbar Navigation */
.navbar-nav {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  gap: 0;
}

.navbar-nav.ms-auto {
  margin-left: auto;
  margin-top: 0;
}

.navbar-nav.me-auto {
  margin-right: auto;
  margin-top: 0;
}

.nav-item {
  list-style: none;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s ease-in-out;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.75);
}

.nav-link.active {
  color: #fff !important;
}

.nav-link.nav-user {
  color: #4da6ff;
  cursor: default;
  font-weight: 500;
}

.nav-link.nav-user:hover {
  color: #4da6ff;
}

/* Responsive Behavior */
@media (max-width: 768px) {
  .navbar-toggle {
    display: block;
  }

  .navbar-content {
    flex-basis: 100%;
    flex-grow: 1;
    flex-direction: column;
    align-items: stretch;
  }

  .navbar-content:not(.collapsed) {
    display: flex;
  }

  .navbar-nav {
    flex-direction: column;
    width: 100%;
  }

  .navbar-nav.me-auto,
  .navbar-nav.ms-auto {
    margin-left: 0;
    margin-right: 0;
  }

  .nav-link {
    padding: 0.5rem 1rem;
  }
}

@media (min-width: 769px) {
  .navbar-content {
    display: flex !important;
  }
}
`

const navbarUserHtml = userid => {
  if (!userid) return ''
  return /* html */ `
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <span class="nav-link nav-user">${userid}</span>
      </li>
    </ul>
  `
}

const navbarHtml = (pages, userid) => /* html */ `
<nav class="navbar">
  <div class="navbar-container">
    <button class="navbar-toggle" type="button" id="navbar-toggle">
      <span class="navbar-toggle-icon"></span>
    </button>
    <div class="navbar-content collapsed" id="navbar-content">
      <ul class="navbar-nav me-auto">
        ${pages.map(it => `<li role="button" class="nav-item"><a id="${it.path.replaceAll('/', '')}" class="nav-link">${it.navName}</a></li>`).join('')}
      </ul>${navbarUserHtml(userid)}
    </div>
  </div>
</nav>
`

const htmlToElement = (html) => {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.firstChild
}

class Navbar {
  constructor (rootElem, navPages, userid = null, styles = {}) {
    let styleSheet = styles.stylesheet || navBarStylesheet
    if (styles.additionalStyles) styleSheet += `\n${styles.additionalStyles}`
    Object.assign(this, { rootElem, navPages, userid, navBarStylesheet: styleSheet })
    this.navbarElem = null
    this.shadowRoot = null
    window.minspa = window.minspa || {}
    window.minspa.router ? this.connectToRouter(window.minspa.router) : window.minspa.onrouterinit = router => this.connectToRouter(router)
  }

  connectToRouter (router) {
    // connect navbar to an existing minspa/router instance
    router.registerNavListener(path => this.newPageDisplayed(path)) // auto update on route change
    this.onNavLinkClicked(path => router.navigateTo(path)) // auto nav on link click
  }

  onNavLinkClicked (cb) {
    // cb: function called when nav link clicked, passed selected path as argument
    this.onNavLinkClickedCb = cb
    return this
  }

  render () {
    if (!this.onNavLinkClickedCb) throw new Error('NavBar.render requires onNavLinkClicked callback')
    const { rootElem, navPages, userid, navBarStylesheet } = this
    if (this.navbarElem) this.navbarElem.remove()

    // Create a container element with shadow DOM and attach stylesheet
    this.navbarElem = document.createElement('div')
    this.shadowRoot = this.navbarElem.attachShadow({ mode: 'open' })
    const styleSheet = new CSSStyleSheet()
    styleSheet.replaceSync(navBarStylesheet)
    this.shadowRoot.adoptedStyleSheets = [styleSheet]

    // set up navbar content
    const navbarContent = htmlToElement(navbarHtml(navPages.filter(it => it.navName), userid))
    this.shadowRoot.appendChild(navbarContent)
    rootElem.appendChild(this.navbarElem)

    // Setup navigation links
    navPages.forEach(page => {
      this.navLinkElemFor(page)?.addEventListener?.('click', (e) => {
        e.stopPropagation()
        this.onNavLinkClickedCb(page.path)
      })
    })
    this.setupToggle()
    this.newPageDisplayed()
    return this
  }

  navLinkElemFor (page) {
    return this.shadowRoot?.querySelector?.(`#${page.path.replaceAll('/', '')}`) || null
  }

  setupToggle () {
    const toggleBtn = this.shadowRoot?.querySelector?.('#navbar-toggle')
    const navbarContent = this.shadowRoot?.querySelector?.('#navbar-content')
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      navbarContent.classList.toggle('collapsed')
    })
  }

  pageForPath (path) {
    return this.navPages.filter(it => it.path === path)[0] || null
  }

  remove () {
    if (this.navbarElem) {
      this.navbarElem.remove()
      this.navbarElem = null
      this.shadowRoot = null
    }
  }

  hide () {
    const navbar = this.shadowRoot?.querySelector?.('.navbar')
    navbar?.classList?.add?.('navbar-hidden')
  }

  show () {
    const navbar = this.shadowRoot?.querySelector?.('.navbar')
    navbar?.classList?.remove?.('navbar-hidden')
  }

  newPageDisplayed (path = new URL(window.location.href).pathname) {
    const { shadowRoot, navPages } = this
    if (!path || !shadowRoot) return // navbar not rendered (yet)

    this.pageForPath(path)?.hideNavBar ? this.hide() : this.show()

    navPages.forEach(page => {
      const navLink = this.navLinkElemFor(page)
      if (navLink) {
        if (path === page.path) {
          navLink.classList.add('active')
        } else {
          navLink.classList.remove('active')
        }
      }
    })
  }
}

export { Navbar }

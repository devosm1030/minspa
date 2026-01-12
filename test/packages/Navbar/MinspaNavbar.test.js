import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'

describe('Navbar.js unit tests', () => {
  beforeEach(async () => {
    vi.resetModules()
    document.body.innerHTML = ''
    if (window.minspa) delete window.minspa
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetAllMocks()
    vi.clearAllMocks()
    document.body.innerHTML = ''
    if (window.minspa) delete window.minspa
  })

  afterAll(() => {
    vi.resetModules()
  })

  test('renders navbar properly', async () => {
    expect.assertions(23)
    const { Navbar: NavBar } = await import('@minspa/navbar')
    const pages = [
      { path: '/page1', navName: 'Page1' },
      { path: '/page2', navName: 'Page2', hideNavBar: true },
      { path: '/secret' }
    ]
    const navBar = new NavBar(document.body, pages, 'testuser')
    window.location = new URL('http://localhost/page1')
    expect(() => navBar.render()).toThrow('NavBar.render requires onNavLinkClicked callback')
    navBar.onNavLinkClicked(vi.fn())
    expect(navBar.newPageDisplayed()).toBeUndefined()
    navBar.render() // initial render for /page1
    let shadowRoot = document.body.querySelector('div').shadowRoot
    expect(shadowRoot.textContent).toContain('Page1')
    expect(shadowRoot.textContent).toContain('Page2')
    expect(shadowRoot.textContent).not.toContain('secret')
    expect(shadowRoot.textContent).toContain('testuser')
    expect(shadowRoot.querySelector('#page1').classList.contains('active')).toBe(true)
    expect(shadowRoot.querySelector('#page2').classList.contains('active')).toBe(false)
    expect(shadowRoot.querySelector('.navbar').classList.contains('navbar-hidden')).toBe(false)
    navBar.newPageDisplayed('/page2')
    expect(shadowRoot.querySelector('#page1').classList.contains('active')).toBe(false)
    expect(shadowRoot.querySelector('#page2').classList.contains('active')).toBe(true)
    expect(shadowRoot.querySelector('.navbar').classList.contains('navbar-hidden')).toBe(true)
    navBar.newPageDisplayed('/page3')
    expect(shadowRoot.querySelector('#page1').classList.contains('active')).toBe(false)
    expect(shadowRoot.querySelector('#page2').classList.contains('active')).toBe(false)
    expect(shadowRoot.querySelector('.navbar').classList.contains('navbar-hidden')).toBe(false)
    navBar.render() // re-render (back to /page1 since we haven't changed window.location)
    shadowRoot = document.body.querySelector('div').shadowRoot
    expect(shadowRoot.textContent).toContain('testuser')
    expect(shadowRoot.querySelector('#page1').classList.contains('active')).toBe(true)
    expect(shadowRoot.querySelector('#page2').classList.contains('active')).toBe(false)
    expect(shadowRoot.querySelector('.navbar').classList.contains('navbar-hidden')).toBe(false)
    shadowRoot.querySelector('#page2').click()
    expect(navBar.onNavLinkClickedCb).toHaveBeenCalledWith('/page2')
    navBar.remove()
    expect(document.body.querySelector('div')).toBeNull()
    expect(navBar.navbarElem).toBeNull()
    navBar.remove()
    expect(navBar.navbarElem).toBeNull()
  })

  test('setupToggle toggles navbar content collapsed class on button click', async () => {
    expect.assertions(3)
    const additionalStyles = /* css */`
      .nav-link.nav-user {
        color: red;
      }
    `
    const { Navbar: NavBar } = await import('@minspa/navbar')
    const pages = [{ path: '/page1', navName: 'Page1' }]
    new NavBar(document.body, pages, null, { additionalStyles }).onNavLinkClicked(vi.fn()).render()
    const shadowRoot = document.body.querySelector('div').shadowRoot
    const toggleBtn = shadowRoot.querySelector('#navbar-toggle')
    const navbarContent = shadowRoot.querySelector('#navbar-content')
    expect(navbarContent.classList.contains('collapsed')).toBe(true) // initially collapsed
    toggleBtn.click()
    expect(navbarContent.classList.contains('collapsed')).toBe(false)
    toggleBtn.click()
    expect(navbarContent.classList.contains('collapsed')).toBe(true)
  })

  test('it integrates with router properly when router exists prior to navbar creation', async () => {
    expect.assertions(2)
    const { Navbar } = await import('@minspa/navbar')
    const pages = [{ path: '/page1', navName: 'Page1' }]
    let navListnerCb = null
    window.minspa = { router: { registerNavListener: cb => { navListnerCb = cb }, navigateTo: vi.fn() } }
    const navbar = new Navbar(document.body, pages).render()
    vi.spyOn(navbar, 'newPageDisplayed')
    navbar.onNavLinkClickedCb('/page1')
    expect(window.minspa.router.navigateTo).toHaveBeenCalledWith('/page1')
    navListnerCb('/page1')
    expect(navbar.newPageDisplayed).toHaveBeenCalledWith('/page1')
  })

  test('it integrates with router properly when router does not exist prior to navbar creation', async () => {
    expect.assertions(1)
    const { Navbar } = await import('@minspa/navbar')
    const pages = [{ path: '/page1', navName: 'Page1' }]
    const navbar = new Navbar(document.body, pages)
    const mockNavTo = vi.fn()
    window.minspa.onrouterinit({ registerNavListener: vi.fn(), navigateTo: mockNavTo })
    navbar.onNavLinkClickedCb('/page1')
    expect(mockNavTo).toHaveBeenCalledWith('/page1')
  })
})

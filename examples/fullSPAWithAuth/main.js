import { Router } from './lib/MinspaRouter.js'
import { Navbar } from './lib/MinspaNavbar.js'
import { appstate } from './lib/MinspaAppstate.js'
import { page1 } from './pages/page1.js'
import { page2 } from './pages/page2.js'
import { stretchExPage } from './pages/stretchEx.js'
import { secretpage } from './pages/secretpage.js'
import { logonpageForRouter as logonpage } from './pages/logonpage.js'
import { unauthorizedpage } from './pages/unauthorizedpage.js'

const pages = [
  // ALL pathes must have a name - no root path '/' (router uses first path as default/home)
  { path: '/page1', page: page1, navName: 'Page 1' },
  { path: '/page2', page: page2, navName: 'Page 2' },
  { path: '/stretchex', page: stretchExPage, navName: 'StretchEx' },
  { path: '/secretpage', page: secretpage, hideNavBar: true },
  { path: '/logon', page: logonpage, hideNavBar: true },
  { path: '/unauthorized', page: unauthorizedpage, hideNavBar: true },
]

function docSetup (title = 'MinSPA Example') {
  // generate title, navbar, and content sections
  const appElem = document.createElement('div')
  appElem.className = 'd-flex flex-column h-100'
  document.body.appendChild(appElem)

  const titleElem = document.createElement('div')
  titleElem.id = 'title'
  titleElem.className = 'title-bar'
  titleElem.innerHTML = `<h4 class="m-0">${title}</h4>`
  appElem.appendChild(titleElem)

  const navElem = document.createElement('div')
  navElem.id = 'navbar'
  appElem.appendChild(navElem)

  const contentElem = document.createElement('div')
  contentElem.id = 'content'
  contentElem.className = 'd-flex flex-column flex-grow-1'
  appElem.appendChild(contentElem)

  return { navElem, contentElem }
}

function onPathAuth (path, { redirectTo, renderHtml }) {
  // authentication logic called by router on navigation & by auth updates

  // go to logon page if auth pending
  if (path !== '/logon' && authIsPending()) {
    appstate.set('logonRedirect', path)
    return redirectTo('/logon')
  }

  // go to unauthorized if user not authorized
  if (path !== '/unauthorized' && isUnauthorized()) return redirectTo('/unauthorized')

  // if returning from a logon, go back to where the logon was triggered from
  const logonRedirect = appstate.get('logonRedirect')
  if (logonRedirect && isAuthorized()) {
    appstate.delete('logonRedirect')
    return redirectTo(validatedPath(logonRedirect))
  }

  if ((path === '/logon' && !isAuthorized()) || path === '/unauthorized') return true
  const validPath = validatedPath(path)
  if (validPath !== path) return redirectTo(validPath)
  return true
}

function validatedPath (path) {
  // return path if authorized for user, else return first authorized path for user
  const validPaths = appstate.get('authDtls').authPages
  if (validPaths.includes(path)) return path
  return validPaths[0]
}

const authIsPending = () => appstate.get('authDtls').status === 'pending'
const isAuthorized = () => appstate.get('authDtls').status === 'authorized'
const isUnauthorized = () => appstate.get('authDtls').status === 'unauthorized'

function main () {
  appstate.set('config', window.appConfig)
  // authDtls saved in sessionStorage, so don't reset if still there from before
  if (!appstate.get('authDtls')) appstate.set('authDtls', { status: 'pending', authPages: [] }, true)
  const { navElem, contentElem } = docSetup()
  const router = appstate.set('router', new Router(contentElem, pages).onPathAuth(onPathAuth).initialNav())
  appstate.on('authDtls', () => {
    if (authIsPending()) {
      navElem.innerHTML = ''
      return router.navigateTo('/logon')
    }
    if (isUnauthorized()) {
      navElem.innerHTML = ''
      return router.navigateTo('/unauthorized')
    }
    router.reauthenticate()
    const { authPages, user } = appstate.get('authDtls')
    navElem.innerHTML = ''
    new Navbar(navElem, pages.filter(page => authPages.includes(page.path)), user).render()
  })
}

main()

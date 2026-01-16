import { Router } from './lib/MinspaRouter.js'
import { Navbar } from './lib/MinspaNavbar.js'
import { page1 } from './pages/page1.js'
import { page2 } from './pages/page2.js'

const pages = [
  // ALL paths must have a name - no root path '/' (router uses first path as default/home)
  { path: '/page1', page: page1, navName: 'Page 1' },
  { path: '/page2', page: page2, navName: 'Page 2' }
]

function docSetup (title = 'Minspa Basic Navigation Example') {
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

function main () {
  const { navElem, contentElem } = docSetup()
  const navBar = new Navbar(navElem, pages)
  new Router(contentElem, pages).initialNav()
  navBar.render()
}

main()

import { appstate } from '../lib/MinspaAppstate.js'

const pageContent = document.createElement('div')
pageContent.innerHTML = /* html */ `
  <div class="flex-grow-1 m-2">
    <h1>Secret Page</h1>
    <p>This is our little secret!</p>
    Go to <a id="goback">Page 1</a>
  </div>
`

const secretpage = {
  domElem: pageContent,
  onRendered: elem => {
    const gobackLink = elem.querySelector('#goback')
    gobackLink.addEventListener('click', (e) => {
      e.stopPropagation()
      appstate.get('router').navigateTo('/page1')
    })
  }
}

export { secretpage }

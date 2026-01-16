const pageHtml = /* html */ `
  <div class="flex-grow-1 m-1 border border-info rounded overflow-y-auto overflow-x-hidden">
    Sample page to demonstrate stretching content to fill available space.
  </div>
`

const temp = document.createElement('template')
temp.innerHTML = pageHtml.trim()

const stretchExPage = { domElem: temp.content.firstChild }

export { stretchExPage }

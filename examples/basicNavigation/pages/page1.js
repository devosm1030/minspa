const pageContent = document.createElement('div')
pageContent.innerHTML = /* html */ `
  <div class="flex-grow-1 m-2">
    <h1>Page 1</h1>
    <p>This is page 1 content.</p>
  </div>
`

const page1 = {
  domElem: pageContent
}

export { page1 }

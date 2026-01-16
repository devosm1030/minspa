const pageContent = document.createElement('div')
pageContent.innerHTML = /* html */ `
  <div class="flex-grow-1 m-2 d-flex justify-content-center align-items-center">
    <p>You are not authorized to see this content.</p>
  </div>
`

const unauthorizedpage = { domElem: pageContent }

export { unauthorizedpage }

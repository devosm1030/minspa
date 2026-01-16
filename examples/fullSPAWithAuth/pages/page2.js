const pageContent = document.createElement('div')
pageContent.innerHTML = /* html */ `
  <div class="flex-grow-1 m-2">
    <h1>Page 2</h1>
    <p>This is page 2 content.</p>
  </div>
`

const page2 = {
  domElem: pageContent,
  onRendered: () => console.log('Page 2 rendered'),
  onUnmount: () => console.log('Page 2 unmounted')
}

export { page2 }

import { modalSvc } from '../lib/MinspaModal.js'

/* this page shows confirmation and loader modals */

const pageContent = document.createElement('div')
pageContent.innerHTML = /* html */ `
  <div class="flex-grow-1 m-2">
    <h1>Page 1</h1>
    <p>This is page 1 content.</p>
    <button id="confirmBtn" class="btn btn-primary">Show Loader</button>
  </div>
`

const handleConfirmClick = async () => {
  const result = await modalSvc.okCancelModal('Do you want to see the loader?', { title: 'Confirmation' })
  if (result) {
    const closeLoader = modalSvc.showLoader()
    setTimeout(closeLoader, 2000)
  }
}

const page1 = {
  domElem: pageContent,
  onRendered: elem => {
    const confirmBtn = elem.querySelector('#confirmBtn')
    confirmBtn.removeEventListener('click', handleConfirmClick)
    confirmBtn.addEventListener('click', handleConfirmClick)
  }
}

export { page1 }

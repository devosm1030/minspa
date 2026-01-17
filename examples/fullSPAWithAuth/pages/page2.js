import { modalSvc } from '../lib/MinspaModal.js'

/* this page shows how to use a modal to get user input */

// Add custom input styles to the modal
// - placing them in the inputModalBody works also, but requires unsafe-inline if using CSP headers
// - adding them to the modalSvc here applies them globally to all modals, be sure to avoid conflicts
modalSvc.addStyles(/* css */`
  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }
`)

const pageContent = document.createElement('div')
pageContent.innerHTML = /* html */ `
  <div class="flex-grow-1 m-2">
    <h1>Page 2</h1>
    <p>This is page 2 content.</p>
    <button id="inputBtn" class="btn btn-primary">Show Input Modal</button>
  </div>
`

const handleInputClick = async () => {
  const inputModalBody = /* html */ `
    <p>Please enter some data:</p>
    <input type="text" id="userInput" class="form-control" placeholder="Type something...">
    <div>
      <strong>⚠️ Danger Will Robinson!</strong> This demo renders user input unsanitized! 
      To see what can happen, try entering: <code>&lt;img src=x onerror="alert('XSS!')"&gt;</code>
      <br><small>Always validate untrusted user input, and use a library like DOMPurify to sanitize before rendering!</small>
    </div>
  `

  let userInputValue = ''

  const onOkCallback = (modalElement) => {
    // Extract the input value from the modal
    const inputField = modalElement.querySelector('#userInput')
    userInputValue = inputField?.value || ''
  }

  const result = await modalSvc.okCancelModal(inputModalBody, {
    title: 'User Input',
    onOk: onOkCallback
  })

  if (userInputValue) {
    // Display the entered value in another okModal
    await modalSvc.okModal(`<p>You entered: <strong>${userInputValue}</strong></p>`, {
      title: 'Your Input'
    })
  } else if (result) {
    // If they clicked OK but didn't enter anything
    await modalSvc.okModal('<p>You didn\'t enter any data.</p>', {
      title: 'No Input'
    })
  }
}

const page2 = {
  domElem: pageContent,
  onRendered: elem => {
    const inputBtn = elem.querySelector('#inputBtn')
    inputBtn.removeEventListener('click', handleInputClick)
    inputBtn.addEventListener('click', handleInputClick)
  }
}

export { page2 }

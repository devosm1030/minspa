/*
  Minspa Modal  v0.0.0 (https://github.com/devosm1030/minspa/)
  Copyright 2026 Mike DeVos
  Licensed under MIT (https://github.com/devosm1030/minspa/blob/main/LICENSE)

  A lightweight vanilla UI modal service with bootstrap like styling.
*/

/*
  The following stylesheet is based on Bootstrap 5.3 Navbar styles, modified for use in Minspa.
   * Bootstrap  v5.3.8 (https://getbootstrap.com/)
   * Copyright 2011-2025 The Bootstrap Authors
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
*/
const modalStylesheet = /* css */`
/* Shadow host styles */
.modal-shadow-host {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

/* Modal Styles */
.modal {
    display: none; /* Hidden by default */
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5); /* Black with opacity */
    animation: fadeIn 0.3s ease;
    pointer-events: auto;
}

.modal.show {
    display: block;
}

/* Hidden class for headers/buttons */
.hidden {
    display: none;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #dee2e6;
}

.modal-header h2 {
    margin: 0;
    color: #333;
    font-size: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.modal-body {
    padding: 20px;
    color: #555;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
}

.modal-body p {
    margin-bottom: 10px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #dee2e6;
}

/* Small modal for loader */
.modal-content-sm {
    max-width: 200px;
}

/* Loader animation */
.loader-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
}

.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Button Styles */
.btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.btn-secondary:hover {
    background-color: #545b62;
}

/* Body overflow control */
body.modal-open {
    overflow: hidden;
}
`

// HTML template for loader modal
const loaderModalHtml = /* html */`
<div class="modal">
  <div class="modal-content modal-content-sm">
    <div class="modal-body loader-modal">
      <div class="loader"></div>
    </div>
  </div>
</div>
`

// HTML template for OK/Cancel modal
const okCancelModalHtml = params => /* html */`
<div class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>${params.title}</h2>
    </div>
    <div class="modal-body">${params.body}</div>
    <div class="modal-footer">
      <button type="button" class="btn-secondary modal-cancel-button">${params?.cancelLabel || 'Cancel'}</button>
      <button type="button" class="btn-primary modal-ok-button">${params?.okLabel || 'OK'}</button>
    </div>
  </div>
</div>
`

// Helper function to create DOM element from HTML string
const createElementFromHTML = (htmlString) => {
  const template = document.createElement('template')
  template.innerHTML = htmlString.trim()
  return template.content.firstChild
}

// Main ModalSvc class - provides modal management without Bootstrap
class ModalSvc {
  constructor () {
    this.loaderDtls = { openCount: 0, delayTimer: null, closeLoader: null }
    this.queuedModals = []
    this.nextModalId = 0
    this.openModal = null
  }

  showModal (modalElement) {
    // queue modals to display one at a time
    const id = ++this.nextModalId

    // Create a container with shadow DOM
    const shadowHost = document.createElement('div')
    shadowHost.className = 'modal-shadow-host'
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' })

    // Add stylesheet to shadow DOM
    const styleElement = document.createElement('style')
    styleElement.textContent = modalStylesheet
    shadowRoot.appendChild(styleElement)

    // Add modal to shadow DOM
    shadowRoot.appendChild(modalElement)

    this.queuedModals.push({ id, shadowHost, shadowRoot, modalElement })
    this.showNextModal()
    return () => this.closeModal(id) // return CB to close this modal
  }

  showNextModal () {
    if ((this.queuedModals.length === 0 || this.openModal)) return // already showing a modal, or none to show
    this.openModal = this.queuedModals.shift()
    const { promise, resolve } = Promise.withResolvers()
    this.openModal.modalShownPromise = promise
    document.body.appendChild(this.openModal.shadowHost)
    setTimeout(() => { // Show the modal with animation
      this.openModal.modalElement.classList.add('show')
      document.body.classList.add('modal-open')
      resolve()
    }, 10)
  }

  async hideCurrentModal () {
    if (!this.openModal) return
    await this.openModal.modalShownPromise
    const { modalElement, shadowHost } = this.openModal
    modalElement.classList.remove('show') // Trigger hidden animation
    setTimeout(() => { // Wait for animation to complete
      this.modalCleanup(modalElement)
      shadowHost.remove()
      document.body.classList.remove('modal-open')
      this.openModal = null
      this.showNextModal()
    }, 300)
  }

  modalCleanup (modalElement) {
    modalElement.querySelector('.modal-ok-button')?.removeEventListener?.('click', modalElement.okHandler)
    modalElement.querySelector('.modal-cancel-button')?.removeEventListener?.('click', modalElement.cancelHandler)
  }

  async closeModal (id) {
    if (this.openModal?.id === id) return await this.hideCurrentModal()
    this.modalCleanup(this.queuedModals.find(it => it.id === id)?.modalElement)
    this.queuedModals = this.queuedModals.filter(it => it.id !== id) // if queued, remove from queue
  }

  okModal (body, options = {}) {
    return this.okCancelModal(body, { ...options, hideCancel: true })
  }

  okCancelModal (body, options = {}) {
    const { promise, resolve } = Promise.withResolvers()
    const { title = null, okLabel = null, cancelLabel = null, hideCancel = false, sanitizer = null } = options
    const safeBody = sanitizer ? sanitizer(body) : body
    const safeTitle = sanitizer && title ? sanitizer(title) : title
    const modalElement = createElementFromHTML(okCancelModalHtml({ body: safeBody, title: safeTitle, okLabel, cancelLabel }))
    if (!title) modalElement.querySelector('.modal-header').classList.add('hidden')
    if (hideCancel) modalElement.querySelector('.modal-cancel-button').classList.add('hidden')
    modalElement.okHandler = () => { resolve(true); this.hideCurrentModal() }
    modalElement.cancelHandler = () => { resolve(false); this.hideCurrentModal() }
    if (!hideCancel) modalElement.querySelector('.modal-cancel-button').addEventListener('click', modalElement.cancelHandler)
    modalElement.querySelector('.modal-ok-button').addEventListener('click', modalElement.okHandler)
    promise.close = this.showModal(modalElement) // add close CB to promise in case caller wants to close programmatically before selection made
    return promise
  }

  showLoader () {
    if (++this.loaderDtls.openCount === 1) { // only one loader for multiple async loading procs
      this.loaderDtls.closeLoader = null
      this.clearLoaderDelay()
      this.loaderDtls.delayTimer = setTimeout(async () => {
        this.loaderDtls.closeLoader = this.showModal(createElementFromHTML(loaderModalHtml))
      }, 500)
    }
    return () => this.closeLoader()
  }

  closeLoader () {
    if (this.loaderDtls.openCount === 0) return // already closed
    if (--this.loaderDtls.openCount === 0) { // don't remove till ALL queued shows done
      this.clearLoaderDelay()
      this.loaderDtls?.closeLoader?.()
    }
  }

  clearLoaderDelay () {
    if (this.loaderDtls.delayTimer) {
      clearTimeout(this.loaderDtls.delayTimer)
      this.loaderDtls.delayTimer = null
    }
  }
}

export { ModalSvc }

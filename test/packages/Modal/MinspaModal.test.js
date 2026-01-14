import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'

describe('MinspaModal.js unit tests', () => {
  beforeEach(async () => {
    vi.resetModules()
    document.body.innerHTML = ''
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.resetAllMocks()
    vi.clearAllMocks()
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  afterAll(() => {
    vi.resetModules()
  })

  test('okModal displays modal with OK button only and handles click as expected', async () => {
    expect.assertions(14)
    const { ModalSvc } = await import('@minspa/modal')
    const modalSvc = new ModalSvc()
    const mockSanitizer = vi.fn((text) => text) // simple pass-through sanitizer
    const resultPromise = modalSvc.okModal('Test message', { title: 'Test Title', sanitizer: mockSanitizer })
    await vi.advanceTimersByTimeAsync(20)

    const shadowRoot = document.body.querySelector('.modal-shadow-host').shadowRoot
    const modalElement = shadowRoot.querySelector('.modal')
    expect(modalElement.classList.contains('show')).toBe(true)
    const modalBody = shadowRoot.querySelector('.modal-body')
    const modalHeader = shadowRoot.querySelector('.modal-header')
    const cancelButton = shadowRoot.querySelector('.modal-cancel-button')
    const okButton = shadowRoot.querySelector('.modal-ok-button')

    expect(document.body.classList.contains('modal-open')).toBe(true)
    expect(modalBody.textContent).toContain('Test message')
    expect(modalHeader.textContent).toContain('Test Title')
    expect(modalHeader.classList.contains('hidden')).toBe(false)
    expect(cancelButton.classList.contains('hidden')).toBe(true)
    expect(modalSvc.openModal).not.toBeNull()
    expect(mockSanitizer).toHaveBeenNthCalledWith(1, 'Test message')
    expect(mockSanitizer).toHaveBeenNthCalledWith(2, 'Test Title')
    okButton.click()
    const result = await resultPromise
    expect(result).toBe(true)
    expect(modalElement.classList.contains('show')).toBe(false)
    await vi.advanceTimersByTimeAsync(320)
    expect(modalSvc.openModal).toBeNull()
    expect(document.body.classList.contains('modal-open')).toBe(false)
    await expect(modalSvc.hideCurrentModal()).resolves.toBeUndefined()
  })

  test('okModal displays modal with OK button only and closes progamatically', async () => {
    expect.assertions(5)
    const { ModalSvc } = await import('@minspa/modal')
    const modalSvc = new ModalSvc()
    const result = modalSvc.okModal('Test message')
    await vi.advanceTimersByTimeAsync(20)
    const shadowRoot = document.body.querySelector('.modal-shadow-host').shadowRoot
    const modalElement = shadowRoot.querySelector('.modal')
    const modalHeader = shadowRoot.querySelector('.modal-header')
    expect(modalElement.classList.contains('show')).toBe(true)
    expect(modalHeader.classList.contains('hidden')).toBe(true)
    result.close()
    await vi.advanceTimersByTimeAsync(320)
    expect(modalElement.classList.contains('show')).toBe(false)
    expect(modalSvc.openModal).toBeNull()
    expect(document.body.classList.contains('modal-open')).toBe(false)
  })

  test('multiple modals work as expected', async () => {
    expect.assertions(12)
    const { ModalSvc } = await import('@minspa/modal')
    const modalSvc = new ModalSvc()
    const result = modalSvc.okModal('Test message')
    const result2 = modalSvc.okModal('Test message2')
    const result3 = modalSvc.okCancelModal('Test message3', { okLabel: 'Yes', cancelLabel: 'No' })
    await vi.advanceTimersByTimeAsync(20)

    // 1st modal should be showing
    let shadowRoot = document.body.querySelector('.modal-shadow-host').shadowRoot
    let modalElement = shadowRoot.querySelector('.modal')
    let modalBody = shadowRoot.querySelector('.modal-body')
    let okButton = shadowRoot.querySelector('.modal-ok-button')
    expect(modalElement.classList.contains('show')).toBe(true)
    expect(modalBody.textContent).toContain('Test message')
    result2.close() // removes 2nd modal from queue
    okButton.click()
    await expect(result).resolves.toBe(true)
    await vi.advanceTimersByTimeAsync(320) // wait for close animation
    await vi.advanceTimersByTimeAsync(20) // wait for next modal to show

    // 3rd modal should be showing now (2nd was removed)
    shadowRoot = document.body.querySelector('.modal-shadow-host').shadowRoot
    modalElement = shadowRoot.querySelector('.modal')
    modalBody = shadowRoot.querySelector('.modal-body')
    okButton = shadowRoot.querySelector('.modal-ok-button')
    const cancelButton = shadowRoot.querySelector('.modal-cancel-button')
    expect(modalElement.classList.contains('show')).toBe(true)
    expect(cancelButton.classList.contains('hidden')).toBe(false)
    expect(modalBody.textContent).toContain('Test message3')
    expect(okButton.textContent).toContain('Yes')
    expect(cancelButton.textContent).toContain('No')
    cancelButton.click()
    await expect(result3).resolves.toBe(false)
    await vi.advanceTimersByTimeAsync(320)
    expect(modalElement.classList.contains('show')).toBe(false)
    expect(modalSvc.openModal).toBeNull()
    expect(document.body.classList.contains('modal-open')).toBe(false)
  })

  test('showLoader displays loader modal after 500ms delay', async () => {
    expect.assertions(10)
    const { ModalSvc } = await import('@minspa/modal')
    const modalSvc = new ModalSvc()
    const closeLoader = modalSvc.showLoader()
    expect(modalSvc.loaderDtls.openCount).toBe(1)
    expect(document.body.classList.contains('modal-open')).toBe(false)
    expect(document.body.querySelector('.modal-shadow-host')).toBeNull() // not visible yet
    await vi.advanceTimersByTimeAsync(520)
    const { shadowRoot } = document.body.querySelector('.modal-shadow-host')
    expect(shadowRoot.querySelector('.loader')).not.toBeNull()
    expect(shadowRoot.querySelector('.loader-modal')).not.toBeNull()
    expect(document.body.classList.contains('modal-open')).toBe(true)
    closeLoader()
    await vi.advanceTimersByTimeAsync(320)
    expect(modalSvc.loaderDtls.openCount).toBe(0)
    expect(document.body.classList.contains('modal-open')).toBe(false)
    expect(modalSvc.closeLoader()).toBeUndefined()
    expect(modalSvc.loaderDtls.openCount).toBe(0)
  })

  test('showLoader does not display if closed before 500ms delay', async () => {
    expect.assertions(5)
    const { ModalSvc } = await import('@minspa/modal')
    const modalSvc = new ModalSvc()
    const closeLoader = modalSvc.showLoader()
    expect(modalSvc.loaderDtls.openCount).toBe(1)
    expect(modalSvc.loaderDtls.delayTimer).not.toBeNull()
    closeLoader() // close before delay elapses
    expect(modalSvc.loaderDtls.openCount).toBe(0)
    expect(modalSvc.loaderDtls.delayTimer).toBeNull()
    await vi.advanceTimersByTimeAsync(510) // advance past delay time
    expect(document.body.querySelector('.modal-shadow-host')).toBeNull()
  })

  test('handles multiple calls correctly', async () => {
    expect.assertions(5)
    const { ModalSvc } = await import('@minspa/modal')
    const modalSvc = new ModalSvc()
    const closeLoader1 = modalSvc.showLoader()
    expect(modalSvc.loaderDtls.openCount).toBe(1)
    const closeLoader2 = modalSvc.showLoader()
    expect(modalSvc.loaderDtls.openCount).toBe(2)
    await vi.advanceTimersByTimeAsync(520)
    expect(document.body.classList.contains('modal-open')).toBe(true)
    closeLoader1()
    closeLoader2()
    expect(modalSvc.loaderDtls.openCount).toBe(0)
    await vi.advanceTimersByTimeAsync(320)
    expect(document.body.classList.contains('modal-open')).toBe(false)
  })
})

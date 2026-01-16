import { appstate } from '../lib/MinspaAppstate.js'

class Logonpage {
  constructor () {
    Object.assign(this, { appstate })
  }

  get html () {
    return /* html */ `
      <form style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; max-width: 600px;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <label for="user" style="min-width: 100px;">Userid:</label>
          <input type="text" class="form-control" id="user" style="flex: 1;">
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <label for="pw" style="min-width: 100px;">Password:</label>
          <input type="password" class="form-control" id="pw" style="flex: 1;">
        </div>
        <button id="logonButton" type="button" class="btn btn-primary" style="align-self: flex-start;">Logon</button>
      </form>
    `
  }

  get domElem () {
    const temp = document.createElement('template')
    temp.innerHTML = this.html.trim()
    return temp.content.firstChild
  }

  onRendered (pageElem) {
    this.userElem = pageElem.querySelector('#user')
    this.pwElem = pageElem.querySelector('#pw')
    this.logonButtonElem = pageElem.querySelector('#logonButton')

    this.logonButtonElem.addEventListener('click', (e) => {
      e.stopPropagation()
      this.logon(this.userElem.value, this.pwElem.value)
    })
  }

  logon (userid) {
    const { users } = this.appstate.get('config')
    if (!userid || users.filter(user => user.id === userid).length === 0) {
      return this.appstate.set('authDtls', { status: 'unauthorized', authPages: [] }, true)
    }
    this.appstate.set('authDtls', {
      user: userid,
      status: 'authorized',
      authPages: users.filter(user => user.id === userid)[0].pages
    }, true)
  }
}

const logonpage = new Logonpage()
const logonpageForRouter = {
  domElem: logonpage.domElem,
  onRendered: (...args) => logonpage.onRendered(...args)
}

export { logonpage, logonpageForRouter, Logonpage }

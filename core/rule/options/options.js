import { css, getShiftInSandbox } from './modules.js'
import { getEnabledStatus, setEnabledStatus, STORE_KEY } from '../store.js'
import browser from '../browser.js'

const AppClassName = css`
  box-sizing: border-box;
  max-width: 1000px;
  padding: 2rem 1rem;
  min-height: 100vh;
  margin: 0 auto;
`

const HeaderClassName = css`
  display: flex;
  justify-content: space-between;

  > .title {
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: .5rem;
    user-select: none;
  }

  > .title > .icon {
    width: 2rem;
    height: 2rem;
  }
`

const ShiftTableClassName = css`
  margin-top: 2rem;

  .th-url {
    width: 80%;
  }

  .th-action {
    width: 20%;
  }

  .td-url {
    > .td-url-input {
      width: 100%;
    }
  }

  .td-action {
    text-align: center;
  }
`

document.querySelector('#app').innerHTML = `
      <div class="${AppClassName}">
        <div class="${HeaderClassName}">
            <span class="title">
                <img class="icon" src="/icon.png" alt="">
                <span>URL Shift</span>
            </span>
            <label>
                <input class="shift-switch" type="checkbox" is="ui-switch">
            </label>
        </div>
        <div class="${ShiftTableClassName}">
            <table class="ui-table">
                <thead>
                    <tr>
                        <th class="th-url">URL</th>
                        <th class="th-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="td-url">
                            <input  type="text" class="ui-input td-url-input" placeholder="Enter URL">
                        </td>   
                        <td class="td-action">
                           <button class="ui-button">Reload</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
`

async function main() {
    // switch
    const switchRef = document.querySelector('.shift-switch')
    switchRef.checked = await getEnabledStatus()
    browser.storage.onChanged.addListener((ev) => {
        if (ev[STORE_KEY.ENABLED]) {
            const newValue = ev[STORE_KEY.ENABLED].newValue
            if (switchRef.checked !== newValue) {
                switchRef.checked = newValue
            }
        }
    })
    switchRef.addEventListener('input', async (ev) => {
        const checked = ev.target.checked
        await setEnabledStatus(checked)
    })
    //
}

main().catch((err) => console.error(err))
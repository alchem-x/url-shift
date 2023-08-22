import { css, getShiftInSandbox, LightTip } from './modules.js'
import { appendShift, getEnabledStatus, getShiftList, setEnabledStatus, STORE_KEY, updateShift } from '../store.js'

const AppClassName = css`
  box-sizing: border-box;
  max-width: 1480px;
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

  .shift-table {
    width: 100%;
  }

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

  .script-container {
    overflow: auto;

    pre {
      margin: 0;
    }
  }
`

const $ = document.querySelector.bind(document)

$('#app').innerHTML = `
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
            <table class="ui-table shift-table">
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
                           <button class="ui-button button-reload" data-type="primary">Reload</button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="script-container">
                                <code>
                                    <pre class="rule-script"></pre>
                                </code>     
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
      </div>
`

async function getShift0() {
    const shiftList = await getShiftList()
    return shiftList[0]
}

async function main() {
    // switch
    const switchRef = $('.shift-switch')
    switchRef.checked = await getEnabledStatus()
    chrome.storage.onChanged.addListener((ev) => {
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
    // url input
    const shift0 = await getShift0()
    $('.ui-input.td-url-input').value = shift0?.url ?? ''
    $('.rule-script').innerHTML = shift0?.script ?? ''

    // reload button
    const reloadButtonRef = $('.button-reload')
    reloadButtonRef.addEventListener('click', async (ev) => {
        try {
            reloadButtonRef.disabled = true
            const url = $('.ui-input.td-url-input').value
            if (!url.trim()) {
                LightTip.error('Please enter URL')
                return
            }
            const response = await fetch(url, {
                headers: {
                    'pragma': 'no-cache',
                    'cache-control': 'no-cache',
                }
            })
            const script = await response.text()
            const rules = await getShiftInSandbox(script)
            const shift0 = await getShift0()
            if (shift0) {
                await updateShift({
                    ...shift0,
                    url,
                    script,
                    rules,
                })
            } else {
                await appendShift({
                    url,
                    script,
                    rules,
                })
            }

            $('.rule-script').innerHTML = script
            LightTip.success('Reload succeeded')
        } catch (err) {
            console.error(err)
            const errorString = err.message || err.toString()
            if (errorString) {
                LightTip.error(errorString)
            }
        } finally {
            reloadButtonRef.disabled = false
        }
    })
}

main().catch((err) => console.error(err))

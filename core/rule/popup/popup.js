import browser from '../browser.js'
import { getEnabledStatus, setEnabledStatus } from '../store.js'

async function main() {
    document.querySelector('.setting').addEventListener('click', async () => {
        await browser.runtime.openOptionsPage()
        window.close()
    })

    document.querySelector('.shift-switch').addEventListener('input', async (ev) => {
        const checked = ev.target.checked
        await setEnabledStatus(checked)
    })

    document.querySelector('.shift-switch').checked = await getEnabledStatus()
}

main().catch((err) => console.error(err))
import { getEnabledStatus, setEnabledStatus } from '../store.js'

async function handleClickSetting() {
    await browser.runtime.openOptionsPage()
    window.close()
}

async function handleShiftEnabledStatusChange(ev) {
    const checked = ev.target.checked
    await setEnabledStatus(checked)
}

async function main() {
    document.querySelector('.setting').addEventListener('click', handleClickSetting)
    document.querySelector('.shift-switch').addEventListener('input', handleShiftEnabledStatusChange)
    document.querySelector('.shift-switch').checked = await getEnabledStatus()
}

main().catch((err) => console.error(err))
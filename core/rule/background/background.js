import browser from '../browser.js'
import { appendShift, getEnabledStatus, getShiftList, STORE_KEY } from '../store.js'
import updateIcon from '../updateIcon.js'

const context = {
    shiftList: [],
    enabled: false,
}

function handleBeforeRequest(request) {
    if (!context.enabled) {
        return
    }
    for (const { shift, enabled } of context.shiftList) {
        if (!enabled) {
            continue
        }
        const response = shift(request)
        if (response) {
            return response
        }
    }
}

async function main() {
    context.shiftList = await getShiftList()
    context.enabled = await getEnabledStatus()
    //
    await updateIcon(context.enabled)

    if (!context.shiftList.length) {
        await appendShift({
            name: '',
            url: '',
        })
    }

    browser.storage.onChanged.addListener((ev) => {
        //
        if (ev[STORE_KEY.ENABLED]) {
            const enabled = ev[STORE_KEY.ENABLED].newValue
            context.enabled = enabled
            updateIcon(enabled)
        }
        //
        if (ev[STORE_KEY.SHIFT_LIST]) {
            context.shiftList = ev[STORE_KEY.SHIFT_LIST].newValue
        }
    })
}

main().catch((err) => console.error(err))

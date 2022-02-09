import browser from '../browser.js'
import { getEnabledStatus, getShiftList, STORE_KEY } from '../store.js'
import updateIcon from '../updateIcon.js'
import { getShift } from '../shift.js'

const context = {
    shiftList: (await getShiftList()).map((it) => {
        return {
            ...it,
            shift: getShift(it.script),
        }
    }),
    enabled: await getEnabledStatus(),
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
    await updateIcon(context.enabled)

    browser.storage.onChanged.addListener((ev) => {
        //
        if (ev[STORE_KEY.ENABLED]) {
            const enabled = ev[STORE_KEY.ENABLED].newValue
            context.enabled = enabled
            updateIcon(enabled)
        }
        //
        if (ev[STORE_KEY.SHIFT_LIST]) {
            context.shiftList = ev[STORE_KEY.SHIFT_LIST].newValue.map((it) => {
                return {
                    ...it,
                    shift: getShift(it.script),
                }
            })
        }
    })

    browser.webRequest.onBeforeRequest.addListener(
        handleBeforeRequest,
        { urls: ['<all_urls>'] },
        ['blocking'],
    )
}

main().catch((err) => console.error(err))

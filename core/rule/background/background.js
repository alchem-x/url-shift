import browser from '../browser.js'
import { appendShift, getEnabledStatus, getShiftList, STORE_KEY } from '../store.js'
import updateIcon from '../updateIcon.js'

const context = {
    shiftList: [],
    enabled: false,
}

async function applyDeclarativeNetRequestDynamicRules(shiftList = []) {
    const addRules = shiftList
        .filter((it) => it.enabled)
        .map((it) => it.rules.map((rule, index) => {
            return {
                id: it.id + index,
                priority: 1,
                action: {
                    type: 'redirect',
                    redirect: {
                        url: rule.redirectUrl
                    }
                },
                condition: {
                    urlFilter: rule.urlFilter,
                    resourceTypes: [
                        'csp_report',
                        'font',
                        'image',
                        'main_frame',
                        'media',
                        'object',
                        'other',
                        'ping',
                        'script',
                        'stylesheet',
                        'sub_frame',
                        'webbundle',
                        'websocket',
                        'webtransport',
                        'xmlhttprequest',
                    ]
                }
            }
        }))
        .flatMap((it) => it)
    const dynamicRules = await browser.declarativeNetRequest.getDynamicRules()
    const removeRuleIds = dynamicRules.map((it) => it.id)
    await browser.declarativeNetRequest.updateDynamicRules({
        addRules,
        removeRuleIds,
    })
}

async function main() {
    context.shiftList = await getShiftList()
    context.enabled = await getEnabledStatus()
    //
    await updateIcon(context.enabled)

    if (!context.shiftList.length) {
        await appendShift({
            name: 'shift0',
            url: '',
        })
    }

    async function reloadDynamicRules() {
        if (context.enabled) {
            await applyDeclarativeNetRequestDynamicRules(context.shiftList)
        } else {
            await applyDeclarativeNetRequestDynamicRules([])
        }
    }

    browser.storage.onChanged.addListener(async (ev) => {
        //
        if (ev[STORE_KEY.ENABLED]) {
            const enabled = ev[STORE_KEY.ENABLED].newValue
            context.enabled = enabled
            await updateIcon(enabled)
            await reloadDynamicRules()
        }
        //
        if (ev[STORE_KEY.SHIFT_LIST]) {
            context.shiftList = ev[STORE_KEY.SHIFT_LIST].newValue
            await reloadDynamicRules()
        }
    })
    await reloadDynamicRules()
}

main().catch((err) => console.error(err))
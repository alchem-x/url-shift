import { getEnabledStatus, getShiftList, STORE_KEY } from '../store.js'
import onEnabledChange from '../onEnabledChange.js'

const context = {
    shiftList: [],
    enabled: false,
}

const defaultResourceTypes = [
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

async function applyDeclarativeNetRequestDynamicRules(shiftList = []) {
    const addRules = shiftList
        .filter((it) => it.enabled)
        .map((it) => {
            return (it.rules ?? []).map((rule, index) => {
                return {
                    id: it.id + index,
                    priority: 1,
                    action: {
                        ...(rule.action ?? {}),
                    },
                    condition: {
                        resourceTypes: defaultResourceTypes,
                        ...(rule.condition ?? {}),
                    }
                }
            })
        })
        .flatMap((it) => it)
    const dynamicRules = await chrome.declarativeNetRequest.getDynamicRules()
    const removeRuleIds = dynamicRules.map((it) => it.id)
    await chrome.declarativeNetRequest.updateDynamicRules({
        addRules,
        removeRuleIds,
    })
}

async function main() {
    chrome.action.onClicked.addListener((ev) => {
        chrome.runtime.openOptionsPage()
    })

    context.shiftList = await getShiftList()
    context.enabled = await getEnabledStatus()
    //
    await onEnabledChange(context.enabled)

    async function reloadDynamicRules() {
        if (context.enabled) {
            await applyDeclarativeNetRequestDynamicRules(context.shiftList)
        } else {
            await applyDeclarativeNetRequestDynamicRules([])
        }
    }

    chrome.storage.onChanged.addListener(async (ev) => {
        //
        if (ev[STORE_KEY.ENABLED]) {
            const enabled = ev[STORE_KEY.ENABLED].newValue
            context.enabled = enabled
            await onEnabledChange(enabled)
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

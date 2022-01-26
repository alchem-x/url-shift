import { fetchScript } from './shift.js'

export const STORE_KEY = {
    ID: 'ID',
    ENABLED: 'ENABLED',
    SHIFT_LIST: 'SHIFT_LIST',
}

async function getNextId() {
    const id = (await browser.storage.local.get())[STORE_KEY.ID]
    const newId = id ? id + 1 : 1
    await browser.storage.local.set({ [STORE_KEY.ID]: newId })
    return newId
}

export async function setEnabledStatus(enabled) {
    await browser.storage.local.set({ [STORE_KEY.ENABLED]: enabled })
}

export async function getEnabledStatus() {
    return (await browser.storage.local.get())[STORE_KEY.ENABLED]
}

export async function setShiftList(shiftList) {
    await browser.storage.local.set({ [STORE_KEY.SHIFT_LIST]: shiftList })
}

export async function getShiftList() {
    return (await browser.storage.local.get())[STORE_KEY.SHIFT_LIST] || []
}

export async function appendShift(shift) {
    await setShiftList([
        ...(await getShiftList()),
        {
            ...shift,
            id: await getNextId(),
            script: await fetchScript(shift.url),
            enabled: true,
        }
    ])
}

export async function deleteShift(id) {
    await setShiftList((await getShiftList()).filter((it) => it.id !== id))
}

export async function updateShift(shift) {
    await setShiftList((await getShiftList()).map((it) => {
        if (it.id !== shift.id) {
            return it
        } else {
            return shift
        }
    }))
}
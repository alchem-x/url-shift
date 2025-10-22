import { fetchScript } from './shift.js'

export const STORE_KEY = {
  ID: 'ID',
  ENABLED: 'ENABLED',
  SHIFT_LIST: 'SHIFT_LIST',
}

async function getItem(key) {
  return (await chrome.storage.local.get())[key]
}

async function setItem(key, value) {
  await chrome.storage.local.set({ [key]: value })
}

export async function getNextId() {
  const id = await getItem(STORE_KEY.ID)
  const newId = id ? id + 1 : 1
  await setItem(STORE_KEY.ID, newId)
  return newId
}

export async function setEnabledStatus(enabled) {
  await setItem(STORE_KEY.ENABLED, enabled)
}

export async function getEnabledStatus() {
  return await getItem(STORE_KEY.ENABLED)
}

export async function setShiftList(shiftList) {
  await setItem(STORE_KEY.SHIFT_LIST, shiftList)
}

export async function getShiftList() {
  const sl = await getItem(STORE_KEY.SHIFT_LIST)
  return Array.isArray(sl) ? sl : []
}

export async function appendShift(shift) {
  const added = {
    ...shift,
    id: await getNextId(),
    script: await fetchScript(shift.url),
  }
  await setShiftList([...(await getShiftList()), added])
  return added
}

export async function deleteShift(id) {
  await setShiftList((await getShiftList()).filter((it) => it.id !== id))
}

export async function updateShift(shift) {
  await setShiftList(
    (await getShiftList()).map((it) => {
      if (it.id !== shift.id) {
        return it
      } else {
        return shift
      }
    }),
  )
}

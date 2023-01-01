import browser from './browser.js'

export default async function updateIcon(enabled) {
    const iconPath = enabled ? '/icon-48.png' : '/icon-gray-48.png'
    await browser.action.setIcon({ path: { 48: iconPath } })
}
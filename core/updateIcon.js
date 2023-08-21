export default async function updateIcon(enabled) {
    // const iconPath = enabled ? '/icon-48.png' : '/icon-gray-48.png'
    // await chrome.action.setIcon({ path: { 48: iconPath } })
    return enabled ? await chrome.action.enable() : await chrome.action.disable()
}
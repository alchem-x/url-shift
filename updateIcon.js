export default async function updateIcon(enabled) {
    const iconPath = enabled ? '/icon.png' : '/icon-gray.png'
    await browser.browserAction.setIcon({ path: { 48: iconPath } })
}
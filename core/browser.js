export default (function () {
    if (typeof browser !== 'undefined') {
        return browser
    } else if (typeof chrome !== 'undefined') {
        chrome.chrome = true
        return chrome
    } else {
        throw new Error('Not browser context')
    }
})()

// rule
// see: https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
define(() => {
    return [
        {
            urlFilter: 'baidu.com',
            redirectUrl: 'https://www.bing.com/',
        },
    ]
})
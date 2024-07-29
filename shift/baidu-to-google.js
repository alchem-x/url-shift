// Rule sample
// See: https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
define(() => {
    return {
        name: 'Baidu To Google',
        rules: [
            {
                condition: {
                    urlFilter: 'baidu.com',
                },
                action: {
                    type: 'redirect',
                    redirect: {
                        url: 'https://www.google.com/',
                    }
                },
            },
        ]
    }
})

// Origin sample
define(() => {
    return (request) => {
        if (/^https:\/\/(www\.)?baidu\.com\/.*/.test(request.url)) {
            return {
                redirectUrl: 'https://www.google.com/',
            }
        }
    }
})
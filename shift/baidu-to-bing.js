// rule
define(() => {
    return [
        {
            pattern: /^https:\/\/(www\.)?baidu\.com\/.*/,
            redirectUrl: 'https://www.google.com/',
        },
    ]
})
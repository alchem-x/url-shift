# Shift

### Sample for origin

#### Redirect Baidu to Google

- Type definition: [shift.d.ts](shift.d.ts)

```javascript
define(() => {
    return (request) => {
        if (/^https:\/\/(www\.)?baidu\.com\/.*/.test(request.url)) {
            return {
                redirectUrl: 'https://www.google.com/',
            }
        }
    }
})
```

##### Use URL

```
https://alchemy-works.github.io/url-shift/shift/baidu-to-google.js
```

##### Use Data URL

```sh
curl 'https://alchemy-works.github.io/url-shift/shift/baidu-to-google.js' | base64 | read s && echo "data:text/javascript;base64,$s"
```

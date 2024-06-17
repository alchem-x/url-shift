function loadJs(url, module = false) {
    return new Promise((resolve, reject) => {
        const scriptRef = document.createElement('script')
        scriptRef.src = url
        if (module) {
            scriptRef.type = 'module'
        }
        scriptRef.addEventListener('load', (ev) => {
            resolve(ev)
        })
        scriptRef.addEventListener('error', (err) => {
            reject(err)
        })
        document.body.appendChild(scriptRef)
    })
}

function loadCss(url) {
    return new Promise((resolve, reject) => {
        const linkRef = document.createElement('link')
        linkRef.rel = 'stylesheet'
        linkRef.href = url
        linkRef.addEventListener('load', (ev) => {
            resolve(ev)
        })
        linkRef.addEventListener('error', (err) => {
            reject(err)
        })
        document.head.appendChild(linkRef)
    })
}

await loadCss(new URL('../third_party/lu2/animate.css', import.meta.url))
await loadCss(new URL('../third_party/lu2/ui.css', import.meta.url))
await loadJs(new URL('../third_party/emotion-css.umd.min.js', import.meta.url))
await loadJs(new URL('../third_party/lu2/safari-polyfill.js', import.meta.url))
await loadJs(new URL('../third_party/lu2/all.js', import.meta.url))

export const { css } = window.emotion
export const Dialog = window.Dialog
export const LightTip = window.LightTip

export function getShiftInSandbox(script) {
    return new Promise((resolve, reject) => {
        function callback(ev) {
            if (ev.data.error) {
                reject(ev.data.error)
            } else {
                resolve(ev.data.data)
            }
            window.removeEventListener('message', callback)
        }

        window.addEventListener('message', callback)

        const iframe = document.querySelector('#sandbox')
        iframe.contentWindow.postMessage(script, '*')
    })
}

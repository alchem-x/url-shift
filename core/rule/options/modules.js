export const { css } = window['emotion']
export const Dialog = window['Dialog']
export const LightTip = window['LightTip']

export function getShiftInSandbox(script) {
    return new Promise((resolve) => {
        function callback(ev) {
            resolve(ev.data)
            window.removeEventListener('message', callback)
        }

        window.addEventListener('message', callback)

        const iframe = document.querySelector('#sandbox')
        iframe.contentWindow.postMessage(script, '*');
    })
}

export function assert(flag, message) {
    if (!flag) {
        throw new Error(message)
    }
}
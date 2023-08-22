import lu2_animate from '../third_party/lu2/animate.css' assert { type: 'css' }
import lu2_ui from '../third_party/lu2/ui.css' assert { type: 'css' }
import '../third_party/emotion-css.umd.min.js'
import '../third_party/lu2/safari-polyfill.js'
import '../third_party/lu2/all.js'

document.adoptedStyleSheets = [lu2_animate, lu2_ui]

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
        iframe.contentWindow.postMessage(script, '*');
    })
}

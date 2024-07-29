import { loadCss, loadJs } from './load.js'

await loadCss(new URL('../third_party/lu2/animate.css', import.meta.url))
await loadCss(new URL('../third_party/lu2/ui.css', import.meta.url))
await loadJs(new URL('../third_party/emotion-css.umd.min.js', import.meta.url))
await loadJs(new URL('../third_party/lu2/safari-polyfill.js', import.meta.url))
await loadJs(new URL('../third_party/lu2/all.js', import.meta.url))
await loadJs(new URL('../third_party/htm.umd.js', import.meta.url))
await loadJs(new URL('../third_party/vue.runtime.global.prod.js', import.meta.url))

export const { css } = window['emotion']
export const Dialog = window['Dialog']
export const LightTip = window['LightTip']
const htm = window['htm']
export const { createApp, defineComponent, h, toRaw, } = window['Vue']
export const html = htm.bind(h)


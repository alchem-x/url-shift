export const browserAPI = (() => {
  if (typeof globalThis.chrome !== undefined) {
    return globalThis.chrome
  }
  if (typeof globalThis.browser !== undefined) {
    return globalThis.browser
  }
})()

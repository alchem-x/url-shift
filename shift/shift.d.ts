type Factory = () => chrome.declarativeNetRequest.Rule[] | {
    name: string
    rules: chrome.declarativeNetRequest.Rule[]
}

declare const define: (factory: Factory) => void

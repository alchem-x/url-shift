declare const browser: {
    storage: {
        local: {
            set: Function
            get: Function
        }
        onChanged: {
            addListener: Function
        }
    }
    action: {
        setIcon: Function
    }
    webRequest: {
        onBeforeRequest: {
            addListener: (listener: Function, filter: object, extraInfoSpec: Array<string>) => unknown
        }
    }
    runtime: {
        openOptionsPage: Function
    }
    chrome: boolean
    scripting: {
        executeScript: Function
    }
}

declare const chrome: typeof browser
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
    browserAction: {
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
    tabs: {
        getCurrent: Function
    }
}

declare const chrome: typeof browser
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
    runtime: {
        openOptionsPage: Function
    }
    chrome: boolean
    scripting: {
        executeScript: Function
    }
    declarativeNetRequest: {
        updateDynamicRules: Function
        getDynamicRules:Function
    }
}

declare const chrome: typeof browser
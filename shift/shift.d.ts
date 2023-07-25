declare enum ResourceType {
    MAIN_FRAME = 'main_frame',
    SUB_FRAME = 'sub_frame',
    STYLESHEET = 'stylesheet',
    SCRIPT = 'script',
    IMAGE = 'image',
    FONT = 'font',
    OBJECT = 'object',
    XMLHTTPREQUEST = 'xmlhttprequest',
    PING = 'ping',
    CSP_REPORT = 'csp_report',
    MEDIA = 'media',
    WEBSOCKET = 'websocket',
    OTHER = 'other'
}

declare interface HttpHeader {
    name: string
    value?: string | undefined
    binaryValue?: ArrayBuffer | undefined
}


declare interface WebRequestDetails {
    method: string
    url: string
    type: ResourceType
}


declare interface BlockingResponse {
    cancel?: boolean | undefined
    redirectUrl?: string | undefined
    responseHeaders?: HttpHeader[] | undefined
    requestHeaders?: HttpHeader[] | undefined
}

type OriginDefine = (factory: () => (details: WebRequestDetails) => BlockingResponse | void) => void

declare interface Rule {
    condition: {
        urlFilter?: string
        regexFilter?: string
    }
    action: {
        type: 'block' | 'redirect'
        redirect?: {
            url?: string
            extensionPath?: string
            regexSubstitution?: string
        }
    }
}

type RuleDefine = (factory: () => Array<Rule>) => void

declare const define: OriginDefine | RuleDefine

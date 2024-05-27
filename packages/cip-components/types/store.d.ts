interface IAction {
    value: (store: IStore, val: any ) => void
}

type IAnyObject = Record<string, unknown>

interface IStore {
    readonly state: {
        accountInfo: IAnyObject
        app: IAnyObject
        [propname: string]: any
    }
    dispatch: (action: ('setApp'|'setAccountInfo') | (string & {}), val: any) => void
    registerActions: (actions: Record<string, IAction>) => void
}

declare const store: IStore

export {
  store as default
}

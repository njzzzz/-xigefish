type TFetchAsyncComponent = (mode?: '/index'| '/mobile' | '/view') => () => Promise<any>

interface ISampleRenderComponent {
  component: TFetchAsyncComponent
  isLayout?: boolean
}
type TDRenderComponentConfig = TFetchAsyncComponent | ISampleRenderComponent

type TDRenderComponentsConfig = Record<string, TDRenderComponentConfig>

type IDRenderConfig = {
  components?: TDRenderComponentsConfig
  plugins?: Array<TDRenderComponentsConfig>
}

export class DRender {
  setConfig: (renderConfig: IDRenderConfig) => undefined
}

export function defineDRenderConfig (renderConfig: IDRenderConfig | {}): IDRenderConfig



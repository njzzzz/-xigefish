import { ElInput, ElInputNumber, ElSelect, ElOption } from 'element-plus'
import { useDisabled, useProxy } from './use-proxy'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'

export default {
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { emit }) {
    const [proxyProtocol, proxyHost, proxyPort, proxyPath] = useProxy(props, ['protocol', 'host', 'port', 'path'], emit)
    const [protocolDisabled, hostDisabled, portDisabled, pathDisabled] = useDisabled(props, ['protocol', 'host', 'port', 'path'])

    return () =>
      <div class={'cip-url-editor'}>
        <ElSelect
          class={'cip-url-editor__protocol'}
          size={props.size}
          v-model={proxyProtocol.value}
          disabled={protocolDisabled.value}
        >
          <ElOption value={'http:'} label={'http://'}></ElOption>
          <ElOption value={'https:'} label={'https://'}></ElOption>
        </ElSelect>
        <ElInput
          class={'cip-url-editor__host'}
          size={props.size}
          v-model={proxyHost.value}
          disabled={hostDisabled.value}
          placeholder={'请输入主机地址'}
        />
        <ElInputNumber
          class={'cip-url-editor__port'}
          controls={false}
          step={1}
          precision={0}
          size={props.size}
          v-model={proxyPort.value}
          min={props.portMin}
          max={props.portMax}
          disabled={portDisabled.value}
          placeholder={'请输入主机端口号'}
        />
        <ElInput
          class={'cip-url-editor__path'}
          size={props.size}
          v-model={proxyPath.value}
          disabled={pathDisabled.value}
          placeholder={'请输入路径'}
        />
      </div>
  }
}

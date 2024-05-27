import { PlHandle } from '@xigefish/page-layout'
import CipButton from '@xigefish/components/cip-button'
import { useMain } from '@xigefish/hooks/use-main'
export default {
  props: { id: {} },
  setup (props) {
    const { setCurrentTitle, closeTab } = useMain()
    setCurrentTitle(props.id)
    return () => <PlHandle>
      {{

        default: () => '我是一个子页面，不能通过页面直接跳进来',
        handle: () => <CipButton onClick={() => closeTab()}>关闭</CipButton>
      }}

    </PlHandle>
  }
}

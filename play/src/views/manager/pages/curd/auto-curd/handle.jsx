import { ref } from 'vue'
import { PlHandle } from '@xigefish/page-layout'
import CipButton from '@xigefish/components/cip-button'
import CipForm from '@xigefish/d-render/cip-form'
import { formFieldList } from '../config'
import { useMain } from '@xigefish/hooks/use-main'
import { accountManagerService } from '@/api'
export default {
  props: {
    layoutTheme: String
  },
  setup (props) {
    const info = ref({ id: 1 })
    const loading = ref(true)
    const { setCurrentTitle } = useMain()
    const getInfo = () => {
      loading.value = true
      accountManagerService.info({ id: 1 }).then(res => {
        info.value = res.data
      }).finally(() => {
        loading.value = false
      })
    }
    const changeTitle = () => {
      setCurrentTitle(info.value.userName)
    }

    getInfo()
    return () => <PlHandle loading={loading.value} theme={props.layoutTheme}>
      {{
        default: () => <div>
          <CipForm
            model={info.value}
            showOnly={true}
            grid={2}
            labelWidth={'80px'}
            fieldList={formFieldList}
          />
        </div>,
        handler: () => < >
          <CipButton onClick={changeTitle}>变更标题</CipButton>
          <CipButton>取消</CipButton>
          <CipButton type={'primary'}>确认</CipButton>
        </>
      }}
    </PlHandle>
  }
}

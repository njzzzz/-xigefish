import { ElLoading } from 'element-plus'
import CipButton from '@xigefish/components/cip-button'
import ExampleRow from '@/components/example-row'
export default {
  directives: {
    loading: ElLoading.directive
  },
  setup () {
    return () => <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flexGrow: 2 }}>
        <ExampleRow label={'单图形(大小)【注：大加载期图标未实现】'} >
          <CipButton buttonType={'search'} loading={true}/>
          <div style={{ height: '100px', width: '100%' }} v-loading={true} >
            hello
          </div>
        </ExampleRow>
      </div>
      <div style={{ flexGrow: 2 }}>
        <ExampleRow label={'图形+文字【注：此处文字颜色UI不符合自己的规范】'} >
          <div style={{ height: '100px' }} v-loading={true} element-loading-text={'正在上传数据...'}></div>
        </ExampleRow>
      </div>
    </div>
  }
}

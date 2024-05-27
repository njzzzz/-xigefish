import { ref } from 'vue'
import CipDialog from '@xigefish/components/cip-dialog'
import BoxShadowCard from './box-shadow-card'
import CipButton from '@xigefish/components/cip-button'
import CipInput from '@xigefish/components/cip-input'
import { ElTooltip, ElIcon, ElSelect, ElOption } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'
import UiStandardPage from '@/components/ui-standard-page'
export default {
  setup () {
    const dialogValue = ref(false)
    return () => <UiStandardPage title={'阴影 · shadow'}>
      <UiStandardPage.Block
        intro={'阴影来源于现实生活的反映物体与物体之间距离的物理现象。在界面中，我们通过阴影来塑造空间的层级关系，更好的传达信息之间的轻重感。'}
      />

      <UiStandardPage.Block
        title={'高度'}
        intro={'阴影是由两个不同阶层的平面产生，且强度由两者之间的距离决定。所以物体的高度直接影响物体的阴影，对象离地面越远阴影越大，模糊值越高。我们将系统分为无、低、中、高四个 UI 层级，对应以下所说的第0、1、2、3层，各自分布在不同的高度，阴影属性也有所不同。'}
      >
         <div style={{
           display: 'flex',
           justifyContent: 'space-around',
           padding: '80px 32px',
           background: 'var(--el-fill-color-light)'
         }}>
           {[0, 1, 2, 3].map(level => <BoxShadowCard style={{ width: '144px', height: '144px', margin: '0 24px' }} key={level} level={level} />)}
         </div>

        <ul style={{ paddingLeft: '20px' }}>
          <li style={'list-style: disc; margin: 35px 0 26px 0'}>
            第 0 层：物体紧贴地面，投影与物体完全重叠，在界面中不对此层定义阴影值。如：输入框
          </li>
          <CipInput style={'width: 300px'}/>
          <li style={'list-style: disc; margin: 35px 0 26px 0'}>
            第 1 层: 物体位于低层级，此时物体被操作(悬停、点击等)触发为悬浮状态，当操作完成或取消时，悬停状态反馈也跟随消失，物体回归到原有的层级中，如：卡片 hover 等；
          </li>
          <CipInput style={'width: 300px; margin-right: 8px'}/>
          <ElTooltip content={'输入的解释说明'} placement={'top'}>
             <ElIcon size={16}>
              <QuestionFilled />
            </ElIcon>
          </ElTooltip>
          <li style={'list-style: disc; margin: 35px 0 26px 0'}>
            第 2 层：物体位于中层级，此时物体与基准面的关系是展开并跟随，物体由地面上的元素展开产生，会跟随元素所在层级的移动而移动，如：下拉面板等；
          </li>
          <ElSelect>
            <ElOption>选项一</ElOption>
          </ElSelect>
          <li style={'list-style: disc; margin: 35px 0 26px 0'}>
            第 3 层：物体位于高层级，该物体的运动和其他层级没有关联，如：对话框等。
          </li>
          <CipButton onClick={() => { dialogValue.value = true }}>查看三层示例</CipButton>
          <CipDialog v-model={dialogValue.value} title={'查看阴影'}/>
         </ul>
      </UiStandardPage.Block>
      <UiStandardPage.Block
        title={'阴影值'}
        intro={'阴影由光照而产生，所以阴影值的大小受到物体高度与光源位置的影响'}
        rules={[
          '在不同高度上时，投射出的阴影颜色、模糊度、面积都有所区分。离地面越远的物体，产生的阴影颜色越淡、模糊度越高、面积越大；反之则颜色更深、模糊度越低、面积越小；',
          '而投影的方向主要由光源与物体的相对位置决定。'
        ]}
      >
        <h4>当前我们参考且复用 Ant Design 中阴影值的大小</h4>
        <ul style={{ color: 'var(--el-text-color-regular)' }} class={'font-14'}>
          <li>Ant Design 中有以下几种阴影运用场景：</li>
          <li>阴影向下：主要应用于组件内部或组件本身，是比较常规场景的用法 </li>
          <li>阴影向上：主要应用于底部导航或工具栏等</li>
          <li>阴影向左：主要应用于右边导航栏、抽屉组件或固定表格栏</li>
          <li>阴影向右：主要应用于左边导航栏、抽屉组件或固定表格栏</li>
        </ul>
      </UiStandardPage.Block>
    </UiStandardPage>
  }
}

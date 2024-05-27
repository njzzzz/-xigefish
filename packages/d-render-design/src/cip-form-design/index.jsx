import { ref } from 'vue'
import { PC, Mobile } from './widgets/icons-vue'
import { cloneDeep } from '@xigefish/d-render-shared'
import CipCodeMirror from '@xigefish/code-mirror'
import CipDialog from '@xigefish/components/cip-dialog'
import { CipButtonText } from '@xigefish/button'
import CipMessageBox from '@xigefish/components/cip-message-box'
import CipFormRenderPreview from '../cip-render-preview'
import CipFormDesignFramework from './widgets/framework'
import EquipmentRadio from './widgets/equipment-radio'
import FormComponents from './widgets/form-components'
import FormDrawing from './widgets/form-drawing'
import FormProperty from './widgets/form-property'

import { componentsGroupList } from './components-config'
import { useSelect } from './hooks'
export default {
  name: 'CipFormDesign',
  props: {
    scheme: Object,
    componentsGroupList: {
      type: Array,
      default: () => componentsGroupList
    }
  },
  setup (props, { emit }) {
    const equipmentOptions = [
      { value: 'pc', svg: PC },
      { value: 'mobile', svg: Mobile }
    ]
    const equipment = ref('pc')
    const { selectItem, selectItemId, changeSelect, updateSelectItem } = useSelect()

    const updateFormConfig = (val) => {
      emit('update:scheme', val)
    }
    const updateList = (value) => {
      const scheme = props.scheme
      scheme.list = value
      updateFormConfig(scheme)
    }

    const updateTableItem = val => {
      if (selectItem.value.config) selectItem.value.config.tableItem = cloneDeep(val)
    }

    const addItem = (item) => {
      // TODO: 考虑如何在当前选中的内容下新增 搜索当前选中元素所在列表及位置 [注：暂不开放此功能]

    }

    const initScheme = () => ({
      labelPosition: 'right',
      labelWidth: 100,
      tableSize: 'default',
      list: []
    })

    const reset = () => {
      CipMessageBox.confirm('确认重置表单配置', '提示', {
        type: 'warning'
      }).then(() => {
        const config = initScheme()
        // 清理已选中的row
        selectItem.value = {}
        updateFormConfig(config)
      }, () => {})
    }
    const previewFormDialog = ref(false)
    const previewForm = () => {
      previewFormDialog.value = true
    }
    const previewJSONDialog = ref(false)
    const previewJSON = () => {
      previewJSONDialog.value = true
    }
    return () => <CipFormDesignFramework>
      {{
        components: () => <FormComponents groupList={props.componentsGroupList} onAdd={(item) => addItem(item)}/>,
        toolbar: () => <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', itemsAlign: 'center', height: '100%' }}>
          <EquipmentRadio v-model={equipment.value} options={equipmentOptions}/>
          <div>
            <CipButtonText onClick={() => reset()}>重置</CipButtonText>
            <CipButtonText onClick={() => previewForm()}>预览</CipButtonText>
            <CipButtonText onClick={() => previewJSON()}>预览JSON</CipButtonText>
          </div>
        </div>,
        default: () => <>
          <FormDrawing
            data={props.scheme}
            equipment={equipment.value}
            selectId={selectItemId.value}
            onSelect={(item) => changeSelect(item)}
            onUpdateList={(list) => { updateList(list) }}
          />
          <CipFormRenderPreview
            v-model={previewFormDialog.value}
            scheme={props.scheme}
            equipment={equipment.value}
          />
          <CipDialog v-model={previewJSONDialog.value} title={'预览JSON'} showOnly={true}>
            <CipCodeMirror modelValue={props.scheme} theme={'dracula'} height={'500px'}/>
          </CipDialog>
        </>,
        property: () => <FormProperty
          selectItem={selectItem.value}
          data={props.scheme}
          onUpdate:data={(val) => updateFormConfig(val)}
          onUpdate:selectItem={(val) => updateSelectItem(val)}
          onUpdate:tableItem={(val) => updateTableItem(val)}
        />
      }}
    </CipFormDesignFramework>
  }
}

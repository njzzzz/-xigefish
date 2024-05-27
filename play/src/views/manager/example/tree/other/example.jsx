import { ref } from 'vue'
import { basicOptions, iconOptions } from './config.js'
import CipTree from '@xigefish/components/cip-tree'
import { ElTreeSelect } from 'element-plus'
import './index.less'
import { Search } from '@element-plus/icons-vue'
import { useBasicOptions } from './use-tree.js'
export default {
  setup () {
    const customConfig = {
      buttonList: [
        'append',
        'remove'
      ]
    }
    const { basicOptions: basic1Options, append: basic1Append, remove: basic1Remove } = useBasicOptions()
    const { basicOptions: basic2Options, append: basic2Append, remove: basic2Remove } = useBasicOptions()
    const { basicOptions: basic3Options, append: basic3Append, remove: basic3Remove } = useBasicOptions()
    const selectTreeRef = ref(null)
    const chooseAll = () => {
      selectTreeRef.value.setCheckedKeys([3, 4, 7, 9])
    }
    const treeSelect = ref()
    return () => <><div class="flex">
        <div>
          <div>基础样式</div>
          <CipTree config={{ highlightCurrent: true }} options={basicOptions} showSearch={false} showButton={false}/>
        </div>
        <div>
          <div>带复选框</div>
          <CipTree
            options={basicOptions}
            config={{ showCheckbox: true }}
            showSearch={false}
            showButton={false}/>
        </div>
        <div>
          <div>带图标</div>
          <CipTree config={{ highlightCurrent: true }} options={iconOptions} showSearch={false} showButton={false}/>
        </div>
        <div>
          <div>14px</div>
          <CipTree
            config={{ highlightCurrent: true }}
            options={basicOptions}
            showSearch={false}
            showButton={false}
            size={'large'}/>
        </div>
    </div>
    <div>使用样例</div>
    <div class="flex">
        <div>
          <div class="select-button">
            <span>标题文字</span>
            <span onClick={chooseAll} style='color:#3786fd'>全选</span>
          </div>
          {<CipTree
            options={basic1Options}
            showButton={false}
            config= {{ ...customConfig, showCheckbox: true }}
            onNodeAppend={basic1Append}
            onNodeRemove={basic1Remove}
            searchPlaceholder="搜索"
            ref={selectTreeRef}
            icon={Search}
            border={true}
            />
          }
        </div>
        <div>
          <br/>
          <br/>
          <CipTree
            options={basic2Options}
            showButton={false}
            config={{ ...customConfig, highlightCurrent: true }}
            onNodeAppend={basic2Append}
            onNodeRemove={basic2Remove}
            searchPlaceholder="搜索"
            icon={Search}
            border={true}
            />
        </div>
        <div>
          <br/>
          <br/>
          <ElTreeSelect v-model={treeSelect.value} data={basicOptions}></ElTreeSelect>
        </div>
        <div>
          {/* <div class="border"> */}
            <br/>
            <br/>
            <CipTree
              options={basic3Options}
              showButton={false}
              config= {{ ...customConfig, showCheckbox: true }}
              onNodeAppend={basic3Append}
              onNodeRemove={basic3Remove}
              searchPlaceholder="搜索"
              size={'large'}
              icon={Search}
              border={true}
            />
          {/* </div> */}
        </div>
    </div>
  </>
  }
}

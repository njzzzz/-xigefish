import { CipForm, defineFormFieldConfig, generateFieldList } from '@xigefish/d-render'
import { PlInfo } from '@xigefish/page-layout'
import { ref } from 'vue'
export default {
  setup () {
    const model = ref({})
    const fieldList = generateFieldList(defineFormFieldConfig({
      asyncLocalSource: {
        label: '异步局部变化源'
      },
      asyncGlobalSource: {
        label: '异步全局变化源'
      },
      localSource: {
        label: '局部变化的源',
        type: 'checkbox',
        otherKey: 'globalSource',
        options: [
          { value: 1, label: '第一个选项' },
          { value: 2, label: '第二个选项' }
        ]
      },
      // globalSource: {
      //   label: '全局变化的源'
      // },
      changeItem: {
        label: '监听',
        dependOn: [
          {
            key: 'localSource',
            effect: {
              changeConfig: (config, { localSource, globalSource }, outValues) => {
                console.log('[local] change config', config)
                if (localSource === 1) config.disabled = true
                // config.placeholder += localSource
                return config
              },
              changeValue: ({ localSource }, outValues, data) => {
                console.log('[local] change value', data)
                // if (data) data.value += ' localSource'
                // return data
                return data
              },
              changeValueByOld: ({ key, oldValue }, values, outValues, data) => {
                console.log('[local] changeValueByOld', { key, oldValue }, values, outValues, data)
              }
            }
          },
          {
            key: 'asyncLocalSource',
            effect: {
              // changeValue: ({ asyncLocalSource }, ov, data) => {
              //   console.log('[local] change value', data)
              //   // return { value: asyncLocalSource }
              //   return data
              // },
              resetValue: true

            }
          },
          'globalSource', 'asyncGlobalSource'],
        // changeValue: ({ globalSource }, outValues, data) => {
        //   console.log('[global] change value', data)
        //   if (!globalSource) {
        //     return {
        //       value: 'hello'
        //     }
        //   }
        // },
        changeValueStr: 'console.log( \'[global] changeValueStr\',dependOnValues.asyncGlobalSource,)',
        changeConfig: [(config, { globalSource }, outValues) => {
          console.log('[global] change config 1', config)
          if (globalSource) config.placeholder = globalSource
          return config
        }, (config, { asyncGlobalSource }) => {
          console.log('[global] change config 2', config)
          if (asyncGlobalSource) config.placeholder = asyncGlobalSource
          return config
        }]
      }
    }))
    return () => <PlInfo>
      <CipForm v-model:model={model.value} fieldList={fieldList}/>
    </PlInfo>
  }
}

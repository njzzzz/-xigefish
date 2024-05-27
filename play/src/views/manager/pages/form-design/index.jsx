import { ref } from 'vue'
import { DrFormDesign } from '@xigefish/d-render-design'
import '@xigefish/d-render-design/dist/index.css'
import { componentsGroupList } from './components-config'
import { useRoute } from "vue-router";
// 单独的页面
export default {
  setup () {
    const schema = ref({ list: [] })
   const route = useRoute()
   console.log('%c🤪 ~ file: index.jsx:10 [setup] -> route : ', 'color: #8ef684', route);
    return () =>
          <DrFormDesign
            v-model:schema={schema.value}
            equipment={'pc'}
            componentsGroupList={componentsGroupList}
          />
  }
}

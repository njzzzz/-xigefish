# @xigefish/page-layout

> 从@xigefish/components/page-layout 分离

## 安装

```bash
npm install -S @xigefish/page-layout
```

### 当前提供的主题

> 可自行编写需要的主题

```bash
# standard 标准
npm install -S @xigefish/page-layout-theme-standard
# dg 东莞
npm install -S @xigefish/page-layout-theme-dg
# supergravity 超重力
npm install -S @xigefish/page-layout-theme-supergravity
```

## 使用说明

### 组件

- PlConfigProvide
- PlList
- PlHandle
- PlInfo
- PlLeftRight
- PlFreedom

### 单主题配置

```jsx
// App.vue
import { PlConfigProvide } from '@xigefish/page-layout'
import Standard from '@xigefish/page-layout-theme-standard'
export default {
  setup(){
    return ()=> <PlConfigProvide theme={Standard}>
      <router-view />
    </PlConfigProvide>
  }
}
// page.jsx 随app.jsx的配置而变换
import { PlList } from '@xigefish/page-layout'
export default {
  setup(){
    return () => <PlList>
      {/* other colde... */}
    </PlList>
  }
}
```

### 多主题，可切换配置

```jsx
// App.jsx
import { PlConfigProvide } from '@xigefish/page-layout'
import Standard from '@xigefish/page-layout-theme-standard'
import Supergravity from '@xigefish/page-layout-theme-supergravity'
export default {
  setup(){
    const theme = ref('standard') // 可根据此属性切换主题
    const themes = {
      standard: Standard,
      supergravity: Supergravity
    }
    return ()=> <PlConfigProvide
      theme={theme.value}
      themes={themes}
    >
      <router-view />
    </PlConfigProvide>
  }
}
// page.jsx 随app.jsx的配置而变换
import { PlList } from '@xigefish/page-layout'
export default {
  setup(){
    return () => <PlList>
      {/* other code... */}
    </PlList>
  }
}
// page-1.jsx 不随app.jsx的配置而变化
import { PlList } from '@xigefish/page-layout'
export default {
  setup(){
    // 会忽略PlConfigProvide配置的theme
    return () => <PlList theme={'supergravity'}>
      {/* other code... */}
    </PlList>
  }
}
```

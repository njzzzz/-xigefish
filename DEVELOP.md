## 开发维护须知

### 新功能及bug修复流程

1. [创建工单](https://git.citycloud.com.cn:3000/cip/cip-plus/issues)  
精确描述bug的复现步骤或截图，或者需要的新功能描述或示例  
创建完成后尽可能的完善右侧标签、里程碑  
指派成员由库所有者指派，或者当前工单由你负责修复，则可指派给自己  

2. 拉取分支从需要修复的版本分支拉取新分支，规则如下
- bug修复 => fix/[version]/[libraryName]/[moduleName]  
example：
```bash
git fetch origin v6.1.x:fix/v6.1.x/components-button
```

- 新功能 => feat/[version]/[libraryName]/[moduleName]  
example：
```bash
git fetch origin v6.1.x:feat/v6.1.x/utils/model
```

3. 修复完成后[创建合并请求](https://git.citycloud.com.cn:3000/cip/cip-plus/pulls)
由库相关负责人进行审核

4. 审核通过后通过合并，并关闭工单

5. 联系库的责任人发布新版本  

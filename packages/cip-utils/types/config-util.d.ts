/**
 * 合并字段配置Map
 * @param targetConfigMap 待合并字段
 * @param sourceConfigMaps 合并字段源数组
 * @return {{}}
 */
interface IAnyObject {
    [propname: string]: any;
}
type TChangeConfig = (config: IRenderConfig, values: IAnyObject, outValues: IAnyObject) => IRenderConfig;
type TChangeValue = (values: IAnyObject, outValues: IAnyObject) => {
    value: any;
    otherValue: any;
} | void;
type TChangeValueByOld = ({ key, oldValue }: {
    key: string;
    oldValue: any;
}, values: IAnyObject, outValues: IAnyObject) => {
    value: any;
    otherValue: any;
} | void;
type TInsert = {
    before: string;
    after?: string;
} | {
    before?: string;
    after: string;
};
interface IRenderConfigDependOnEffect {
    changeValue: boolean | TChangeValue;
    changeConfig: boolean | TChangeConfig;
}
interface IRenderConfigDependOn {
    key: string;
    effect?: IRenderConfigDependOnEffect;
}
interface IRenderConfig {
    sourceKey?: string;
    realKey?: string;
    /**
     * 组件类型
     */
    type?: string;
    /**
     * 表单项label文案展示
     */
    label?: string;
    /**
     * 表单项宽度
     */
    width?: number | string;
    /**
     * 当前表单项的依赖项（依赖项为当前表单的其他表单key），配置后，可在依赖项发生改变时，修改当前表单项的值或配置。
     * 修改配置 - {@link changeConfig}；
     * 修改值 - {@link changeValue}；
     */
    dependOn?: Array<string | IRenderConfigDependOn>;
    /**
     * 当前表单项的另一个key，在部分表单组件会抛出另一个值，抛出的值会被当前配置的otherKey接收
     */
    otherKey?: string | Array<string>;
    /**
     * 当前表单项是否可编辑
     */
    writable?: boolean;
    /**
     * 当前表单项是否可读
     */
    readable?: boolean;
    /**
     * 是否可禁用当前表单项
     */
    disabled?: boolean;
    importDisabled?: boolean;
    /**
     * 修改当前表单项的配置，受{@link dependOn} 配置影响，会在dependOn的值发生修改时触发
     * @param  {IRenderConfig} config - 当前表单项的配置
     * @param  {IAnyObject} values - dependOn配置的依赖项的值组成的对象
     * @param  {IAnyObject} outValues
     * @description 需要返回修改后的config，才能触发修改对当前表单项的配置
     * @renturn config
     */
    changeConfig?: TChangeConfig;
    /**
     * 修改当前表单项的配置，受{@link dependOn} 配置影响，会在dependOn的值发生修改时触发
     * @param  {IAnyObject} values - dependOn配置的依赖项的值组成的对象
     * @param  {IAnyObject} outValues
     * @description 返回undefined将忽略本次对当前表单项更新值的操作，返回{value: any, otherValue: any}会对当前表单项的值进行修改
     * @return undefined | {value: any, otherValue: any}
     */
    changeValue?: TChangeValue;
    immediateChangeValue?: boolean;
    changeValueByOld?: TChangeValueByOld;
    changeEffect?: (value: any, key: string, model: IAnyObject) => Promise<any>;
    insert?: TInsert;
    [propname: string]: any;
}
interface ITableRenderConfig {
    /**
     * 超出宽度后是否展示tooltip
     */
    showOverflowTooltip?: boolean;
    dynamic?: boolean;
    fixed?: boolean | "left" | "right";
    /**
     * 当前表单项最小宽度
     */
    minWidth?: string;
}
interface IBaseFormRenderConfig {
    /**
     * 当前表单项占用的栅格数
     */
    span?: number;
    labelWidth?: string;
    labelStyle?: IAnyObject;
    itemStyle?: IAnyObject;
}
interface IFormRenderConfig {
    /**
     * 当前表单项是否必填
     */
    required?: boolean;
    requiredErrorMessage?: string;
    triggerType?: "input";
    requiredType?: "blur" | "change";
    validateValue?: "email" | "identityCard" | "mobilePhone";
    regexpValidate?: string;
    validateExistRemote?: (value: any, dependOnValues: IAnyObject) => Promise<{
        data: boolean;
    }>;
    validateExistRemoteErrorMessage?: string;
}
interface ISearchRenderConfig {
    immediateSearch?: boolean;
    autoSelect?: boolean;
}
interface IConfig<T> {
    key: string;
    config: T;
}
type TFormConfigUnion = IRenderConfig & IBaseFormRenderConfig & IFormRenderConfig;
type TSearchConfigUnion = IRenderConfig & IBaseFormRenderConfig & ISearchRenderConfig;
type TTableConfigUnion = IRenderConfig & ITableRenderConfig;
type IFormFieldConfig = Record<string, TFormConfigUnion>;
type ISearchFieldConfig = Record<string, TSearchConfigUnion>;
type ITableFieldConfig = Record<string, TTableConfigUnion>;
type TConfigListToMap = ((configMap: IConfig<TFormConfigUnion>[]) => IFormFieldConfig) | ((configMap: IConfig<TTableConfigUnion>[]) => ITableFieldConfig) | ((configMap: IConfig<TSearchConfigUnion>[]) => ISearchFieldConfig);
export declare const configListToMap: TConfigListToMap;
export { defineFieldConfig, defineFormFieldConfig, defineTableFieldConfig, defineSearchFieldConfig, keysToConfigMap, mergeFieldConfig, generateFieldList, configMapToList, insertFieldConfigToList, } from '@xigefish/d-render-shared';

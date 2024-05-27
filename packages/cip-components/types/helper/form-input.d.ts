import {Ref, Prop, ComputedOptions} from 'vue'
import {ComputedRefValue} from "vue/macros";
import {IAnyObject, IFormConfig} from "@xigefish/d-render-shared/types/config-util";


interface IProps {

}

interface IContext {

}
interface IUpdateStream {

}
interface IFormInput {
    inputRef: Ref<Element>
    inputStyle: Ref<CSSStyleRule>
    proxyValue: Ref<any>
    securityConfig: Ref<IAnyObject>
    updateStream: IUpdateStream
    proxyOtherValue: Array<Ref<any>>
    placeholder: Ref<string>
    clearable: Ref<boolean>
    width: Ref<string>
    noMatchText: Ref<string>
}

export function useFormInput(props: IProps, context: IContext ):IFormInput

interface IInputOptions {
    options: Ref<any[]>
    optionProps: Ref<{
        label: string
        value: string
        children: string
    }>
    getOptions: () => Promise<Array<any>>
    isObjectOption: Ref<boolean>
    getValue: (modelValue: string| Array<string>)=> string| Array<string>
    getModelValue: (value: string| Array<string>) => string| Array<string>
    getOtherValue: (modelValue: string| Array<string>, value: string| Array<string>) => string| Array<string> | Array<IAnyObject>
    splitKey: Ref<string>
    proxyOptionsValue: Array<Ref<any>>
}

export function useOptions(props: IProps, multiple: boolean, updateStream: IUpdateStream, context: IContext): IInputOptions

export function useElementFormEvent(): {
    handleChange: (val: any) => void
    handleBlur: (val: any) => void
}

interface IFormInputProps {
    fieldKey: string
    modelValue: any
    otherValue: any
    values: Array<any>
    dependOnValues: IAnyObject
    outDependOnValues: IAnyObject
    disabled: boolean
    showTemplate: boolean
    // model: {},
    changeCount: number
    onStatusChange: (e: Event)=>void
    config: IFormConfig,
    usingRules: boolean
    rules: Array<IAnyObject>
    // 防止attr隐式贯穿导致的继承问题
    error: any
    id: string
    tableData: Array<any> // table子组件特有属性
    onSearch: (e: Event)=>void // 供CipSearchForm使用
}

export const formInputProps: IFormInputProps
export const formInputViewProps: IFormInputProps
export const fromInputEmits: ['streamUpdate:model', 'update:modelValue']
export const formInputEmits: ['streamUpdate:model', 'update:modelValue']

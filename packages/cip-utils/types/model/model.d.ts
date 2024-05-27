interface IAnyObject {
    [key: string]: any;
}
type IFieldType = [InstanceType<typeof Model>] | InstanceType<typeof Model> | 'this' | ['this'] | StringConstructor | DateConstructor | NumberConstructor | BooleanConstructor;
interface IField {
    field?: string;
    type?: IFieldType;
    default?: any;
    map?: Map<any, any>;
    array?: boolean;
    json?: boolean;
    ignoreToData?: boolean;
    _renderConfig?: IAnyObject;
}
type IConfig = Record<string, IField>;
interface IModelConstructorOptions {
    part?: any;
    ignoreEmpty?: boolean;
}
type TConfigAttachProps = {
    _paramsTransform?: (...args: any) => any;
};
export default class Model<T extends IConfig & TConfigAttachProps | 'this' | ['this'] = IConfig & TConfigAttachProps | 'this' | ['this']> {
    options?: IModelConstructorOptions;
    config?: IConfig;
    paramsTransform: (...args: any) => any;
    constructor(config?: T, options?: IModelConstructorOptions);
    formatConfig(config?: {}): Record<string, Partial<IField>>;
    fromData(data?: {}): any;
    fromDataSet(data?: any[]): any[];
    toData(data?: {}): any;
    toDataSet(data?: any[]): any[];
}
export declare function defineEntity<T extends Record<string, IField>>(entity: T): T;
export type ExtractEntityTypes<O> = {
    [K in keyof O]?: InferPropType<O[K], O>;
};
type DefaultFactory<T> = (props: Data) => T | null | undefined;
export type Data = Record<string, unknown>;
export interface PropOptions<T = any, D = T> {
    type?: PropType<T> | true | null;
    required?: boolean;
    default?: D | DefaultFactory<D> | null | undefined | object;
    validator?(value: unknown): boolean;
    /**
     * @internal
     */
    skipCheck?: boolean;
    /**
     * @internal
     */
    skipFactory?: boolean;
}
type PropConstructor<T = any> = {
    new (...args: any[]): T & {};
} | {
    (): T;
} | PropMethod<T>;
type PropMethod<T, TConstructor = any> = [T] extends [
    ((...args: any) => any) | undefined
] ? {
    new (): TConstructor;
    (): T;
    prototype: TConstructor;
} : never;
export type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
export type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type InferPropType<T, O> = [T] extends [null] ? any : [T] extends [{
    type: null | true;
}] ? any : [T] extends [{
    type: ObjectConstructor;
}] ? Record<string, any> : [T] extends [{
    type: BooleanConstructor;
}] ? boolean : [T] extends [{
    type: DateConstructor;
}] ? Date : [T] extends [{
    type: Model<infer X>[];
}] ? X extends string ? ExtractEntityTypes<O>[] : ExtractEntityTypes<X>[] : [T] extends [{
    type: Model<infer X>;
}] ? X extends string ? ExtractEntityTypes<O> : ExtractEntityTypes<X> : [T] extends [{
    type: (infer U)[];
}] ? U extends DateConstructor ? Date | InferPropType<U, O> : InferPropType<U, O> : [T] extends [Prop<infer V, infer D>] ? unknown extends V ? IfAny<V, V, D> : V : T;
export {};

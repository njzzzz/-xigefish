export declare class SubQianKunProp<T> {
    static instance: InstanceType<typeof SubQianKunProp>;
    config: T;
    constructor();
    getConfig(): T;
    setConfig(config: T): void;
}

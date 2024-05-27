type Data<I> = {
    uid: string;
    info: {
        method: I;
        startTime: number;
        times?: number;
    };
};
declare class CConsole<T, I> {
    effective: T;
    requestHistory: Record<string, Data<I>>;
    constructor(effective: T);
    open(info: I): any;
    append(uid: string, type: any, info: any): void;
    end(uid: any): void;
}
export declare const cConsole: CConsole<boolean, unknown>;
export {};

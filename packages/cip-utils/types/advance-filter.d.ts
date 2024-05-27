interface IFilterCondition {
    key: string;
    operator: string;
    value: any;
}
type GroupCondition = IFilterGroup | IFilterCondition;
interface IFilterGroup {
    relation: 'and' | 'or' | undefined;
    conditions: Array<GroupCondition>;
}
type TStrategy = (value: any, conditionValue: any) => boolean;
interface IAdvanceFilter {
    setStrategy(operator: string, handler: TStrategy): void;
    filter(list: Array<any>, group: IFilterGroup | Array<GroupCondition>): Array<any>;
}
export declare class AdvanceFilter implements IAdvanceFilter {
    strategies: {
        '=': (value: any, conditionValue: any) => boolean;
    };
    constructor(strategies: any);
    setStrategy(operator: string, handler: TStrategy): void;
    isGroup(condition: any): boolean;
    isCondition(condition: any): boolean;
    conformConditions(item: any, conditions: any, relation?: string): boolean;
    isConform(item: any, group: any): boolean;
    filter(list: Array<any>, x: IFilterGroup | Array<GroupCondition>): any[];
}
export {};

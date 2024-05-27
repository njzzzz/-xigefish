type ToUpperFirstCase<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
export declare function getRouteName<T extends string, U extends string>(baseName: T, routeName: U): T extends '' ? U : `${T}${ToUpperFirstCase<U>}`;
export declare const prependRoutes: <T extends {
    path?: string;
    name?: string | symbol;
}>(routes: T[], { path, name }?: {
    path?: string;
    name?: string;
}) => T[];
export declare const getBaseName: (basePath: string) => string;
export declare const getDefaultBaseRoute: (filePath: string, frameworkPath: string) => string;
export {};

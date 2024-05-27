import { ColorInput } from '@ctrl/tinycolor';

export declare const setElPrimaryColor: (color: ColorInput, prefix?: string) => void;
export declare const setElColor: (type: 'primary' | string, color: ColorInput, prefix?: string) => void;
export declare const getELColor: (type: any) => string;

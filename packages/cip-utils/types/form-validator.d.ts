type Validator = <T extends (...args: any) => any>(rule: {
    message?: string;
}, value: string, callback: T) => void;
/**
 *  邮箱验证
 * @param {*} rule
 * @param {*} value
 * @param {Function} callback
 */
export declare const emailValidator: Validator;
/**
 * 身份证号校验
 * @param {*} rule
 * @param {*} value
 * @param {Function} callback
 */
export declare const identityCardValidator: Validator;
/**
 * 手机号校验
 * @param {*} rule
 * @param {*} value
 * @param {Function} callback
 */
export declare const mobilePhoneValidator: Validator;
/**
 * sql语句简单校验校验
 * @param {*} rule
 * @param {*} value
 * @param {Function} callback
 */
export declare const sqlSimpleValidator: Validator;
export {};

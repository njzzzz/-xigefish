export {
  cloneDeep,
  objectEqual,
  throttle,
  debounce,
  toUpperFirstCase,
  toTreeData,
  isEmpty,
  isInputEmpty,
  isNotEmpty,
  isEmptyObject,
  isArray,
  isObject,
  isString,
  isNumber,
  isJson,
  downloadFile,
  getNextItem,
  durationTimeFormat,
  getQueryString,
  setUrlQuery,
  getLabelByValue,
  getFieldValue,
  setFieldValue,
  getValueByKey,
  getKeyByValue,
  getValueMapping,
  depthFirstSearchTree,
  depthFirstSearchIndexTree,
  getPropertyKeyByPath,
  getEquipmentType,
  addThousandSeparator,
  getValueByTemplate,
  Strategy,
  subStr,
  getUsingConfig,
} from "@xigefish/d-render-shared";

export async function runMaybeFun<
  A extends any[],
  F extends (...args: A) => any
>(fn: F, ...args: A) {
  if (typeof fn === "function") {
    return await fn(...args);
  }
}

// eslint-disable-next-line import/no-duplicates
import Example from './example'
// eslint-disable-next-line import/no-duplicates,import/no-webpack-loader-syntax
import ExampleRaw from '!raw-loader!./example'
Example.Raw = ExampleRaw
export default Example

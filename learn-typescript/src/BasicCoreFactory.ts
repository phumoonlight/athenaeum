import { basicCorePreset } from './BasicCorePresetName'
import BasicCore from './BasicCore'

export default class BasicCoreFactory {
  static create = (initialValue: basicCorePreset): BasicCore => new BasicCore(initialValue)
}

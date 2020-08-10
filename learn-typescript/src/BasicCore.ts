
type Presetname = 'bob' | 'jack'

class BasicCore {
  state: Presetname;

  constructor(initialValue: Presetname) {
    this.state = initialValue
  }

  doSomething = (): Presetname => this.state

  static doFirst = (): void => console.info('dofirst')
}

export default BasicCore

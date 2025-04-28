'use strict';

class Sum {
  static create(shape) {
    const keys = Object.keys(shape);
    if (keys.length !== 1) {
      throw new Error('Sum.create expects a single root tag');
    }
    const tag = keys[0];
    const variantsObj = shape[tag];
    const variantNames = Object.keys(variantsObj);

    if (!('None' in variantsObj)) {
      throw new Error('Sum.create expects a None variant');
    }
    const VariantNone = variantsObj.None;
    const noneInstance = new VariantNone();

    class Struct {
      constructor(...args) {
        if (args.length === 0) return noneInstance;
        const VariantSome = variantsObj.Some;
        return new VariantSome(...args);
      }

      static create(...args) {
        return new Struct(...args);
      }
    }

    Struct.None = noneInstance;
    Struct.tag = tag;
    Struct.variants = variantNames;

    return Struct;
  }
}

// Usage

class Some {
  constructor(value) {
    this.value = value;
  }
}

class None {
  static #instance;

  constructor() {
    if (None.#instance) return None.#instance;
    None.#instance = this;
  }
}

const Option = Sum.create({ Option: { Some, None } });

const some = Option.create(42);
const none = Option.create();

console.log(some);
// { value: 42, tag: 'Option', type: 'Some' }

console.log(none);
// None {}

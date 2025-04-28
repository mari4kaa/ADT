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

    class Struct {
      constructor(...args) {
        return Struct.create(...args);
      }

      static create(value) {
        for (let i = 0; i < variantNames.length; i++) {
          const variant = variantNames[i];
          const VariantClass = variantsObj[variant];
          if (VariantClass.is(value)) {
            return new VariantClass(value);
          }
        }
        throw new Error('No matching variant for value');
      }
    }
    Struct.tag = tag;
    Struct.variants = variantNames;

    return Struct;
  }
}

// Usage

class Integer {
  constructor(value) {
    this.value = value;
  }

  static is(value) {
    return typeof value === 'number' && Number.isInteger(value);
  }
}

class Bool {
  constructor(value) {
    this.value = value;
  }

  static is(value) {
    return typeof value === 'boolean';
  }
}

class Some {
  constructor(value) {
    this.value = value;
  }

  static is(value) {
    return typeof value !== 'undefined';
  }
}

class None {
  static #instance;

  constructor() {
    if (None.#instance) return None.#instance;
    None.#instance = this;
  }

  static is(value) {
    return typeof value === 'undefined';
  }
}

const Option = Sum.create({ Option: { Integer, Bool, None } });

const a = Option.create(42);
const b = Option.create(false);
const c = Option.create();
console.log({ a, b, c });

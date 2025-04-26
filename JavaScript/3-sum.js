'use strict';

class Sum {
  static create(tag, variants) {
    class Struct {}

    for (const variant of variants) {
      Object.defineProperty(Struct, variant, {
        value: (...args) => Object.freeze({ tag, type: variant, args }),
        enumerable: true,
        writable: false,
        configurable: false,
      });
    }

    Struct.tag = tag;
    Struct.variants = variants.slice();

    return Struct;
  }
}

// Usage

const Option = Sum.create('Option', ['some', 'none']);
const some = Option.some(42);
const none = Option.none();
console.log({ some, none });

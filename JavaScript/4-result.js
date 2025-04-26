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

class Result {
  static Struct = Sum.create('Result', ['some', 'error']);

  static some(value) {
    return Result.Struct.some(value);
  }

  static error(error) {
    return Result.Struct.error(error);
  }
}

// Usage

const success = Result.some('Data loaded');
const failure = Result.error(new Error('Network issue'));
console.log(success);
console.log(failure);

if (success.type === 'some') {
  console.log('Success:', success.args[0]);
} else {
  console.log('Failure:', failure.args[0].message);
}

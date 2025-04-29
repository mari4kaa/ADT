'use strict';

class Result {
  constructor({ value, error }) {
    this.value = value;
    this.error = error;
  }

  static create(input) {
    if (input instanceof globalThis.Error) {
      return new Result({ value: undefined, error: input });
    }
    return new Result({ value: input, error: undefined });
  }

  static fromValue(value) {
    return new Result({ value, error: undefined });
  }

  static fromError(error) {
    return new Result({ value: undefined, error });
  }

  isSuccess() {
    return this.error === undefined;
  }

  isError() {
    return this.error !== undefined;
  }
}

// Usage

const success = Result.create('Successfully received data');
const failure = Result.create(new Error('Network error'));

if (success.isSuccess()) {
  console.log('Success:', success.value);
}

if (failure.isError()) {
  console.log('Failure:', failure.error.message);
}

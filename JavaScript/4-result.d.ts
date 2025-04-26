export type Some<T> = Variant<'some'> & { args: [T] };
export type Error = Variant<'Error'> & { args: [unknown] };

export declare class Result {
  static Struct: SumStruct<['some', 'error']>;
  static some<T>(value: T): Some<T>;
  static error(error: unknown): Error;
}

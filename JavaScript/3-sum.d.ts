export type Variant<K extends string> = {
  tag: string;
  type: K;
  args: unknown[];
};

export interface SumStruct<T extends readonly string[]> {
  readonly tag: string;
  readonly variants: T;
  [K in T[number]]: (...args: unknown[]) => Variant<K>;
}

export declare class Sum {
  static create<T extends readonly string[]>(
    tag: string,
    variants: T
  ): SumStruct<T>;
}

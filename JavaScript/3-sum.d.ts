export declare class Sum {
  static create<
    T extends string,
    U extends { Some: new (...args: unknown[]) => object; None: new () => object }
  >(
    shape: Record<T, U>
  ): {
    new (...args: unknown[]): object;
    create(...args: unknown[]): object;
    None: object;
    readonly tag: T;
    readonly variants: string[];
  };
}

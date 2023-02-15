// eslint-disable-next-line @typescript-eslint/no-explicit-any
let addAction: undefined | ((name: string, id: number, args: any[]) => void);
let actionId = 0;

export const setAddAction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (name: string, id: number, args: any[]) => void
) => {
  addAction = fn;
};

export const action =
  (name: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => {
    addAction?.(name, actionId++, args);
  };

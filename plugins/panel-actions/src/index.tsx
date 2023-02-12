let addAction: (name: string, id: number, args: any[]) => void;
let actionId = 0;

export const setAddAction = (
  fn: (name: string, id: number, args: any[]) => void
) => {
  addAction = fn;
};

export const action =
  (name: string) =>
  (...args: any[]) => {
    addAction?.(name, actionId++, args);
  };

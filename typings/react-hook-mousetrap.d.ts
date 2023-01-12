declare module "react-hook-mousetrap" {
  function useMouseTrap(
    handlerKey: string | string[],
    cb: () => void,
    event?: string
  ): void;
  export default useMouseTrap;
}

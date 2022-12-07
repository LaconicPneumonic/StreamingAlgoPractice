import create from "zustand";

type State = {
  faucet: string | null;
  algo: string | null;
};

type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<string & Property>}`]: (
    val: Type[Property]
  ) => void;
};

const useAlgoStore = create<State & Setters<State>>((set) => ({
  faucet: null,
  algo: null,
  setFaucet: (val) => set(() => ({ faucet: val })),
  setAlgo: (val) => set(() => ({ algo: val })),
}));

export { useAlgoStore };

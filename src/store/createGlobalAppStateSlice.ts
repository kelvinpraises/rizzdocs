import { immer } from "zustand/middleware/immer";

type State = {
  appActive: boolean;
  hierarchicalSequence: boolean;
};

type Actions = {
  setAppActive: (isActive: boolean) => void;
  setHierarchicalSequence: (isHS: boolean) => void;
};

export default immer<State & Actions>((set, get) => ({
  appActive: false,
  hierarchicalSequence: false,

  setAppActive: (isActive) =>
    set((state) => {
      state.appActive = isActive;
    }),

  setHierarchicalSequence: (isHS) =>
    set((state) => {
      state.hierarchicalSequence = isHS;
    }),
}));

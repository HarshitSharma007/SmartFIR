import { create } from "zustand";

interface firState {
  firArr: [];
  setFir: (fir: any) => void;
}

const useFirStore = create<firState>()((set) => ({
  firArr: [],
  setFir: (fir) => set((state) => ({ firArr: fir })),
}));

export default useFirStore;

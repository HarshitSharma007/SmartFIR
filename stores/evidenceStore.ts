import { create } from "zustand";

interface evidenceState {
  evidenceArr: [];
  setEvidence: (evidence: any) => void;
}

const useEvidenceStore = create<evidenceState>()((set) => ({
  evidenceArr: [],
  setEvidence: (evidence) => set((state) => ({ evidenceArr: evidence })),
}));

export default useEvidenceStore;

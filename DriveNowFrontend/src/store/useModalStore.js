import { create } from 'zustand'; 

const useModalStore = create((set) => ({
    openProfile: false,
    setOpenProfile: (value) => set({ openProfile: value }),
}));

export default useModalStore;

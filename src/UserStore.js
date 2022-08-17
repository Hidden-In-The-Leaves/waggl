import create from 'zustand';

const useUserStore = create((set) => ({
  userId: 0,
  setUserId: (returnId) => set((state) => ({ userId: returnId })),
}));

export default useUserStore;

import { create } from 'zustand';

const store = create((set) => ({
    count: 69,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));

const userStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default store;
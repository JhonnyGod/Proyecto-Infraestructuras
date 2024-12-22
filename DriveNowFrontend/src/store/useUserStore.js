import { create } from "zustand";
import {persist} from "zustand/middleware"

// Variables o estados globales
// const useUserStore = create((set)=>({
//     user: null,
//     setUser: (newUser) => set({user: newUser}),
//     clearUser: () => set({user: null})
// }));

// Persistencia global
const useUserStore = create(
    persist((set, get)=>({
        user: null,
        setUser: (newUser) => set({user: newUser}),
        clearUser: () => set({user: null}),
        hasSession: () => get().user !== null,
    }),
    {name: "user-storage"}
));

export default useUserStore;
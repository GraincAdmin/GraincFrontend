import { create } from "zustand";

const loginRequestStore = create((set) => ({
    loginRequest: false,
    setLoginRequest: (value) => set({ loginRequest: value }),

    prePageOption: false,
    setPrePageOption: (value) => set({ prePageOption: value }),

    loginRequestMembership: false,
    setLoginRequestMembership: (value) => set({ loginRequestMembership: value }),
}));

export default loginRequestStore;

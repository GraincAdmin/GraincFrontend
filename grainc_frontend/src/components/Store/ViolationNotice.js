import { create } from "zustand";

const violationNoticeStore = create((set) => ({
    violationNotice: false,
    setViolationNotice: (value) => set({violationNotice: value}),

    violationType: '',
    setViolationType: (value) => set({violationType: value}),

    violationDetail: '',
    setViolationDetail: (value) => set({violationDetail: value}),

    prePageOption: false,
    setPrePageOption: (value) => set({ prePageOption: value }),
}));

export default violationNoticeStore
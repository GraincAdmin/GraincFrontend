import { create } from "zustand";

const SnackBarStore = create((set) => ({

    viewSnackBar: false,
    setViewSnackBar: (value) => set({viewSnackBar: value}),

    snackBarStyle: 'normal',
    setSnackBarStyle: (value) => set({snackBarStyle: value}),

    snackBarMessage: '',
    setSnackBarMessage: (value) => set({snackBarMessage: value}),

    showSnackBar: (message, style) => set({viewSnackBar: true ,snackBarMessage: message, snackBarStyle: style})

}));

export default SnackBarStore
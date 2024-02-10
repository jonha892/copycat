import { create } from "zustand";


const CORRECT_PIN = await Promise.resolve("1122")

const isLoggedIn = localStorage.getItem("pin") === CORRECT_PIN


type PinState = {
    isLoggedIn: boolean;
    enterPin: (pin: string) => boolean;
}

const usePinStore = create<PinState>((set) => ({
    isLoggedIn: isLoggedIn,
    enterPin: (pin: string) => {
        localStorage.setItem("pin", pin)
        const success = pin === CORRECT_PIN
        set({ isLoggedIn: success})
        return success
    },
}));

export default usePinStore;
export { CORRECT_PIN };

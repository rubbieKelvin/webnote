import { createStore } from "vuex";

export const store = createStore({
    state: {
        globals: {
            popup: null,
            sidebar: ''
        },
        mobileNavigation: {
            screen: null // the current screen
        }
    },
})
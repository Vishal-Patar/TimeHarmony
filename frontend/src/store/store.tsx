import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from '../features/drawer/drawerSlice'

const store = configureStore({
    reducer: {
        drawer: drawerReducer
    },
});

export default store;

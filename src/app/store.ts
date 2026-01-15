import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {apiSlice} from '../utils/api.ts';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Здесь будут ваши обычные слайсы, если они есть (например, auth или theme)
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// Типизация для TypeScript (чтобы хуки useSelector и useDispatch понимали структуру данных)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, doc, updateDoc, increment, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { collection } from "firebase/firestore";

const INITIAL_STATE = {
    cart: [],
    cartLoading: true,
    totalPrice: 0,
    orders: [],
};

export const addItemThunk = createAsyncThunk(
    "cart/addItem",
    async (arg, thunkAPI) => {
        const { user, product } = arg;
        const ref = collection(db, "usersCarts", user, "mycart");

        await addDoc(ref, {
            quantity: 1,
            ...product,
        });

        return product;
    }
);

export const updateQuantityThunk = createAsyncThunk(
    "cart/updateQuantity",
    (arg, thunkAPI) => {
        const { user, itemId, number } = arg;
        const ref = doc(db, "usersCarts", user, "mycart", itemId);

        return updateDoc(ref, {
            quantity: increment(number),
        });
    }
);

export const removeItemThunk = createAsyncThunk(
    "cart/removeItem",
    (arg, thunkAPI) => {
        const { user, itemId } = arg;
        const ref = doc(db, "usersCarts", user, "mycart", itemId);

        return deleteDoc(ref);
    }
);

export const purchaseThunk = createAsyncThunk(
    "cart/purchase",
    async (arg, thunkAPI) => {
        const { user } = arg;
        const ref = collection(db, "usersOrders", user, "orders");
        await addDoc(ref, {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            total: thunkAPI.getState().cartReducer.totalPrice,
            items: thunkAPI.getState().cartReducer.cart,
        });

        return thunkAPI.getState().cartReducer.cart;
    }
);

export const emptyTheCartThunk = createAsyncThunk(
    "cart/emptyTheCart",
    async (arg, thunkAPI) => {
        const { user } = arg;
        const querySnapShot = await getDocs(
            collection(db, "usersCarts", user, "mycart")
        );
        querySnapShot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        return thunkAPI.getState().cartReducer.cart;
    }
);

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: INITIAL_STATE,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setCartLoading: (state, action) => {
            state.cartLoading = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;
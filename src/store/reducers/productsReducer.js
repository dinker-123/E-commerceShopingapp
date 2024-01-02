import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    products: [],
    productsLoading: true,
    searchQuery: "",
    selectedCategories: [],
    maxPrice: 1000,
};

const productsSlice = createSlice({
    name: "productsSlice",
    initialState: INITIAL_STATE,
    reducers: {
        setProducts: (state, action) => {
            state.products = [...action.payload];
        },
        setProductsLoading: (state, action) => {
            state.productsLoading = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSelectedCategories: (state, action) => {
            state.selectedCategories = action.payload;
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload;
        },
    },
});

export const productsReducer = productsSlice.reducer;
export const productsAction = productsSlice.actions;
export const productsSelector = (state) => state.productsReducer;
import React, { createContext, useReducer } from 'react';

let initData = {
    products: [],
    search: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider value={useReducer(reducer, initData)}>
            {children}
        </AppContext.Provider>
    )
};
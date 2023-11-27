import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAccInfo } from '../types/interfaces';

interface accountState {
    user: IAccInfo;
    isAuth: boolean,
    isLoading: boolean,
    error: string
}

const initialState:accountState = {
    user: {
        eventFiltersInfo: {
            usedCompanyCount: 0,
            companyLimit: 0
        }
    },
    isAuth: false,
    isLoading: false,
    error: ''
}

export const accSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        accFetching(state){
            state.isLoading = true;
        },
        accFetchingSuccses(state, action:PayloadAction<IAccInfo>){
            state.user = action.payload;
            state.isAuth = true;
            state.isLoading = false;
        },
        accFetchingError(state, action:PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload;
        },
        accLogout(state){
            state.isAuth = false;
            state.user = initialState.user;
        }
    }
});

export default accSlice.reducer;
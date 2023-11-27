import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDocScan, IHistogramData, IDocScanError } from '../types/interfaces';

export interface IDocState {
    histogram: IHistogramData[],
    publications: IDocScan[],
    isLoading: boolean,
    search: boolean,
    errorHistogram: string,
    errorPublications: IDocScanError[]
}

export const initialState:IDocState = {
    histogram: [
            {
                data: [
                    {
                    date: '',
                    value: 0
                    }
                ],
                histogramType: ''
            }
    ],
    publications: [
        {
            ok: {
                schemaVersion: '',
                id: '',
                version: 0,
                issueDate: '',
                url: '',
                author: {
                    name: ''
                },
                source: {
                    id: 0,
                    name: '',
                    categoryId: 0,
                    levelId: 0,
                    groupId: 0
                },
                dedupClusterId: '',
                title: {
                    text: '',
                    markup: ''
                },
                content: {
                    markup: ''
                },
                attributes: {
                    isTechNews: false,
                    isAnnouncement: false,
                    isDigest: false,
                    wordCount: 0
                },
                language: ''
            }
            
        }
    ],
    search: false,
    isLoading: false,
    errorHistogram: '',
    errorPublications: [
        {
            fail: {
                errorCode: 400,
                errorMessage: ''
            }
        }
    ]
}

export const docSlice = createSlice({
    name:'docs',
    initialState,
    reducers: {
        docFetching(state) {
            state.isLoading = true;
        },
        docFetchingHistogram(state, action:PayloadAction<IHistogramData[]>){
            state.histogram = action.payload;
            state.search = true;
        },
        docFetchingHistogramError(state, action:PayloadAction<string>){
            state.errorHistogram = action.payload;
            state.search = false; 
        },
        docFetchingPublications(state, action:PayloadAction<IDocScan[]>){
            state.publications = action.payload;
            state.search = true;
        },
        docFetchingPublicationsError(state, action:PayloadAction<IDocScanError[]>){
            state.errorPublications = action.payload;
            state.search = false;
        },
        docFetchingEnd(state){
            state.isLoading = false;
            state.search = false;
        }
    }
})

export default docSlice.reducer;
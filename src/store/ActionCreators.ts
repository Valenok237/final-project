import { appDispath } from "../store";
import axios from "axios";
import { IAccInfo, ISearchForm } from "../types/interfaces";
import { formatStartDate, formatEndDate } from "../funcs/someFuncs";
import { accSlice } from "./AccSlice";
import { docSlice } from "./DocSlice";


const HTTPS:string = 'https://gateway.scan-interfax.ru';

export const fetchAcc = (login:string, password:string) => async (dispatch:appDispath) => {
    try {
        dispatch(accSlice.actions.accFetching());
        const responseLogin = await axios.post(`${HTTPS}/api/v1/account/login`, {
            login: login,
            password: password
        });
        localStorage.setItem('token', responseLogin.data.accessToken);
        localStorage.setItem('expire', responseLogin.data.expire);
        const responseInfo = await axios.get<IAccInfo>(`${HTTPS}/api/v1/account/info`, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(accSlice.actions.accFetchingSuccses(responseInfo.data));
    }
    catch (e:any) {
        dispatch(accSlice.actions.accFetchingError(e));
        alert('Неправильный логин или пароль');
    }
};

export const logoutAcc = (dispatch:appDispath) => {
    dispatch(accSlice.actions.accLogout());
    localStorage.clear();
};

export const fetchDoc = (data:ISearchForm) => async (dispatch:appDispath) => {
    try {
        dispatch(docSlice.actions.docFetching());
        
        const responseHistogram = axios.post(`${HTTPS}/api/v1/objectsearch/histograms`, {
            "issueDateInterval": {
                "startDate": formatStartDate(data.dateStart),
                "endDate": formatEndDate(data.dateEnd)
                },
                "searchContext": {
                "targetSearchEntitiesContext": {
                    "targetSearchEntities": [
                    {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": data.inn,
                        "maxFullness": data.maxFullness,
                        "inBusinessNews": data.businessNews
                    }
                    ],
                    "onlyMainRole": data.mainRole,
                    "tonality": data.tonality,
                    "onlyWithRiskFactors": data.riskFactors,
                    "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                    },
                    "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                    }
                },
                "themesFilter": {
                    "and": [],
                    "or": [],
                    "not": []
                }
                },
                "searchArea": {
                "includedSources": [],
                "excludedSources": [],
                "includedSourceGroups": [],
                "excludedSourceGroups": []
                },
                "attributeFilters": {
                "excludeTechNews": data.techNews,
                "excludeAnnouncements": data.announcements,
                "excludeDigests": data.digests
                },
                "similarMode": "duplicates",
                "limit": data.limit,
                "sortType": "sourceInfluence",
                "sortDirectionType": "desc",
                "intervalType": "month",
                "histogramTypes": [
                "totalDocuments",
                "riskFactors"
                ]   
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        
        const responseResult = axios.post(`${HTTPS}/api/v1/objectsearch`,{
            "issueDateInterval": {
            "startDate": formatStartDate(data.dateStart),
            "endDate": formatEndDate(data.dateEnd)
            },
            "searchContext": {
            "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                {
                    "type": "company",
                    "sparkId": null,
                    "entityId": null,
                    "inn": data.inn,
                    "maxFullness": data.maxFullness,
                    "inBusinessNews": data.businessNews
                }
                ],
                "onlyMainRole": data.mainRole,
                "tonality": data.tonality,
                "onlyWithRiskFactors": data.riskFactors,
                "riskFactors": {
                "and": [],
                "or": [],
                "not": []
                },
                "themes": {
                "and": [],
                "or": [],
                "not": []
                }
            },
            "themesFilter": {
                "and": [],
                "or": [],
                "not": []
            }
            },
            "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
            },
            "attributeFilters": {
            "excludeTechNews": data.techNews,
            "excludeAnnouncements": data.announcements,
            "excludeDigests": data.digests
            },
            "similarMode": "duplicates",
            "limit": data.limit,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
            "totalDocuments",
            "riskFactors"
            ]   
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        );

        const resultData = await Promise.all([
            responseHistogram, responseResult
        ])

        dispatch(docSlice.actions.docFetchingHistogram(resultData[0].data.data));

        const ids = resultData[1].data.items.map((obj: { encodedId: string }) => obj.encodedId);

        const responcePublications = await axios.post(`${HTTPS}/api/v1/documents`, {
            "ids": ids
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        dispatch(docSlice.actions.docFetchingPublications(responcePublications.data));
    }
    catch(e:any) {
        dispatch(docSlice.actions.docFetchingHistogramError);
        dispatch(docSlice.actions.docFetchingPublicationsError);
        alert('Публикации не найдены. Попробуйте использовать другие параметры.');
    }
}

export const docBegin = (dispatch:appDispath) =>{
    dispatch(docSlice.actions.docFetchingEnd());
}
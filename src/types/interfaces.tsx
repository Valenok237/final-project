// Для формы авторизации
export interface ISubmitFields {
    login: string
    password: string
}
// Для запроса аккаунта
export interface IAccInfo {
    eventFiltersInfo:{
        usedCompanyCount: number,
        companyLimit: number
    }
}
// Для формы поиска публикаций
export interface ISearchForm {
    inn: string,
    limit: string,
    tonality: string
    dateStart: string,
    dateEnd: string,
    mainRole: boolean,
    riskFactors: boolean,
    businessNews: boolean,
    maxFullness: boolean,
    techNews: boolean,
    announcements: boolean,
    digests: boolean
}

export interface IOptions {
    label: string,
    value: string
}

// Для запроса публикаций

export interface IHistogramData {
    data:IIntervalPoint[]
    histogramType: string
}

export interface IIntervalPoint {
    date: string,
    value: number,
    risk?: number
}

export interface IDocScan {
    ok: IDocParams
}

export interface IDocParams {
    schemaVersion?: string,
    id?: string,
    version?: number,
    issueDate: string,
    url: string,
    author?: {
        name: string
    },
    source: {
        id: number,
        name: string,
        categoryId: number,
        levelId: number,
        groupId: number
    },
    dedupClusterId?: string,
    title: {
        text: string,
        markup: string
    },
    content: {
        markup: string
    },
    attributes: IDocAttributes,
    language?: string 

}

export interface IDocAttributes {
    isTechNews: boolean ,
    isAnnouncement: boolean,
    isDigest: boolean,
    wordCount: number
}  

export interface IDocScanError {
    fail: IDocScanParamsError
}

interface IDocScanParamsError {
    errorCode: number,
    errorMessage: string
}
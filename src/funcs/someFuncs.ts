import { IDocAttributes } from '../types/interfaces';
import publication from '../components/publication/publication.jpg';

export const formatStartDate = (date:string):string => {
    const parts = date.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return year + '-' + month + '-' + day + 'T00:00:00+03:00'
}

export const formatEndDate = (date:string):string => {
    const parts = date.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return year + '-' + month + '-' + day + 'T23:59:59+03:00'
}

export const getDate = (date:string):string => {
    const parts = date.split(/-|T/);
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return day + '.' + month + '.' + year;
}

export const createContent = (str:string):string => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(str, 'text/xml');
    const regularStr = xmlDoc.getElementsByTagName('scandoc')[0].textContent;
    let newStr = regularStr?.replace(/(<([^>]+)>)/ig, '');
    if(newStr!.length > 700) {
        return newStr!.slice(0, 700) + '...';
    } 
    return newStr!;
};

export const imgUrl = (str:string):string => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(str, 'text/xml');
    const regularStr = xmlDoc.getElementsByTagName('scandoc')[0].textContent;
    if (regularStr?.includes('srcset="h')) {
        const parts = regularStr?.split('srcset=');
        const part = parts[1].split(' ');
        const url = part[0].slice(1, -1);
        return url;
    } else if (regularStr?.includes('<img src="h')) {
        const parts = regularStr?.split('<img src=');
        const part = parts[1].split(' ');
        const url = part[0].slice(1, -1);
        return url;
    } else {
        return publication;
    }
};

export const createWords = (num:number):string => {
    let a = [2, 3, 4];
    let b = [5, 6, 7, 8, 9, 0];
    let c = num + ' слово';
    a.forEach(item => {
        if(num % 10 === item) {
            return c = num + ' слова';
        }
    });
    b.forEach(item => {
        if(num % 10 === item) {
            return c = num + ' слов';
        }
    });
    return c;
}

export const urlLink = (str:string):string => {
    if(str === '' || str === null) {
        return str = '#!'
    }
    return str;
}

export const category = (obj:IDocAttributes):string => {
    if(obj.isTechNews) {
        return 'Технические новости';
    } else if(obj.isAnnouncement) {
       return 'Aнонсы и события';
    } else if(obj.isDigest) {
       return 'Cводки новостей';
    } else {
        return 'Новости страны';
    }
}
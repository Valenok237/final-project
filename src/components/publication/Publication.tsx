import { IDocScan, IDocAttributes } from '../../types/interfaces';
import { getDate, imgUrl, createContent, createWords, urlLink, category } from '../../funcs/someFuncs';

const Publication:React.FC<IDocScan> = ({ok}) => {

    const massage = (e:React.MouseEvent<HTMLAnchorElement>) => {
        if(e.currentTarget.href.includes('#!')){
            alert('Источник не доступен');
        }
    };
    
    return ( 
        <div className='result-publication'>
            <p className='result-publication__text'>
                <span className='result-publication__text_date'>{getDate(ok.issueDate)}</span>
                <span className='result-publication__text_src'>{ok.source.name}</span>
            </p>
            <h3 className='result-publication__title'>{ok.title.text}</h3>
            <div className='result-publication__category'>{category(ok.attributes)}</div>
            <div style={{backgroundImage: `url(${imgUrl(ok.content.markup)})`}} className='result-publication__img'></div>
            <p className='result-publication__main'>
                {createContent(ok.content.markup)}
            </p>
            <div className='result-publication__wrapper'>
                <a href={urlLink(ok.url)} onClick={massage} className='result-publication__btn'>Читать в источнике</a>
                <div className='result-publication__words'>{createWords(ok.attributes.wordCount)}</div>
            </div>
        </div>
    );
}
 
export default Publication;
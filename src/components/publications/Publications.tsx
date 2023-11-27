import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IDocParams } from '../../types/interfaces';
import Publication from '../publication/Publication';

const Publications = () => {
    const {publications} = useAppSelector(state => state.doc);
    const [click, setClick] = useState(1);

    const dataPublications = publications.map(item => item.ok);

    const datePublicationSort = () => {
        dataPublications.sort((a:IDocParams, b:IDocParams) => {
            return Date.parse(a.issueDate) - Date.parse(b.issueDate);
        });
    }
    datePublicationSort();
    console.log(publications);

    return ( 
        <>
            <div className='result-publications__wrapper'>
                {dataPublications.slice(0, 10 * click).map((item, index) => {
                    return <Publication 
                    key={index}
                    ok={{
                        issueDate: item.issueDate,
                        url: item.url,
                        source:item.source,
                        title:item.title,
                        content:item.content,
                        attributes: item.attributes
                    }}
                    />
                })}
            </div>
            {Math.ceil(dataPublications.length/10) > click &&
                <button onClick={() => setClick(click => click + 1)} className='result-publications__btn'>Показать больше</button>
            }
        </>
    );
}
 
export default Publications;
import { useAppSelector } from '../../hooks/redux';
import { IIntervalPoint } from '../../types/interfaces';
import { getDate } from '../../funcs/someFuncs';

const Table = () => {
    const {histogram} = useAppSelector(state => state.doc);

    const dataHistogram = histogram.map(obj => obj.data);
    const dataRisk = dataHistogram[1].map(item =>{
        return {risk: item.value}
    });
    const dataTotal = dataHistogram[0];
    const dataResult = dataTotal.map(item2 => {
        const item1 = dataRisk.find(item => {
            return item;
        })
        return {...item2, ...item1};
    })
    
    const dateHistogramSort = () => {
        dataResult.sort((a:IIntervalPoint, b:IIntervalPoint) => {
            return Date.parse(a.date) - Date.parse(b.date);
        });
    }
    dateHistogramSort();

    return ( 
        <table className='table'>
            <thead className='table-stats'>
                <tr className='table-stats__column'>
                    <th className='table-stats__item'>Период</th>
                    <th className='table-stats__item'>Всего</th>
                    <th className='table-stats__item'>Риски</th>
                </tr>
            </thead>
            <tbody className='table-values'>
                {dataResult.map((item, index) => {
                return <tr key={index} className='table-values__column'>
                            <td key={index + 1} className='table-values__item'>{getDate(item.date)}</td>
                            <td key={index + 2} className='table-values__item'>{item.value}</td>
                            <td key={index + 3} className='table-values__item'>{item.risk}</td>
                        </tr>
                })}
            </tbody>
        </table>
    );
}
 
export default Table;
import { useAppSelector } from '../../hooks/redux';
import { IIntervalPoint } from '../../types/interfaces';
import { getDate } from '../../funcs/someFuncs';
import { useState, useRef } from 'react';

const Table = () => {
    const {histogram} = useAppSelector(state => state.doc);

    const [offset, setOffset] = useState(0);
    const table = useRef<HTMLTableElement>(null!);
    const tableStats = useRef<HTMLTableSectionElement>(null!);
    const tableValues = useRef<HTMLTableSectionElement>(null!);

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
    
    const handleLeftArrowClick = () => {
        setOffset(currentOffset => {
            const newOffset = currentOffset + (table.current?.offsetWidth - tableStats.current?.offsetWidth);
            return Math.min(newOffset, 0);
        })
    };

    const handleRightArrowClick = () => {
        setOffset(currentOffset => {
            const newOffset = currentOffset - (table.current?.offsetWidth - tableStats.current?.offsetWidth);
            const maxOffset = -(tableValues.current?.offsetWidth - (table.current?.offsetWidth - tableStats.current?.offsetWidth) - 20);
            return Math.max(maxOffset, newOffset);
        })
    };

    return (
        <div className="result-table__wrapper">
            <div onClick={handleLeftArrowClick} className="result-table__arrow result-table__arrow_left"></div>
            <table ref={table} className='table'>
                <thead ref={tableStats} className='table-stats'>
                    <tr className='table-stats__column'>
                        <th className='table-stats__item'>Период</th>
                        <th className='table-stats__item'>Всего</th>
                        <th className='table-stats__item'>Риски</th>
                    </tr>
                </thead>
                <tbody ref={tableValues} style={{transform: `translateX(${offset}px)`}} className='table-values'>
                    {dataResult.map((item, index) => {
                        return <tr key={index} className='table-values__column'>
                                    <td key={index + 1} className='table-values__item'>{getDate(item.date)}</td>
                                    <td key={index + 2} className='table-values__item'>{item.value}</td>
                                    <td key={index + 3} className='table-values__item'>{item.risk}</td>
                                </tr>
                    })}
                </tbody>
            </table>
            <div onClick={handleRightArrowClick} className="result-table__arrow result-table__arrow_right"></div>
        </div>
    );
}
 
export default Table;